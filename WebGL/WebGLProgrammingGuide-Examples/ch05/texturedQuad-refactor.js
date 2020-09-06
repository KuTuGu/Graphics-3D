const VSHADER_SOURCE = `
attribute vec4 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;
void main(){
    gl_Position = aPosition;
    gl_PointSize = 10.0;
    vTexCoord = aTexCoord;
}
`;

const FSHADER_SOURCE = `
precision mediump float;
uniform sampler2D uSampler;
varying vec2 vTexCoord;
void main(){
    gl_FragColor = texture2D(uSampler, vTexCoord);
}
`; 

const vertices = new Float32Array([
    -0.5, 0.5, 0.0, 1.0,
    -0.5, -0.5, 0.0, 0.0,
    0.5, 0.5, 1.0, 1.0,
    0.5, -0.5, 1.0, 0.0
]);
const FSIZE = vertices.BYTES_PER_ELEMENT;

const displayCanvas = document.getElementById("webgl"),
context = getWebGLContext(displayCanvas);

context.clearColor(0.0, 0.0, 0.0, 1);

if(!initShaders(context, VSHADER_SOURCE, FSHADER_SOURCE)){
    throw new Error('Fail to initialize shaders.');
}

let vertexBuffer = context.createBuffer();
if(!vertexBuffer){
    throw new Error('Fail to create the buffer object.');
}

context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);
context.bufferData(context.ARRAY_BUFFER, vertices, context.STATIC_DRAW);

const aPosition = context.getAttribLocation(context.program, 'aPosition');
context.vertexAttribPointer(aPosition, 2, context.FLOAT, false, FSIZE * 4, 0);
context.enableVertexAttribArray(aPosition);

const aTexCoord = context.getUniformLocation(context.program, 'aTexCoord');
context.vertexAttribPointer(aTexCoord, 2, context.FLOAT, false, FSIZE * 4, FSIZE * 2);
context.enableVertexAttribArray(aTexCoord);

let img = new Image();
img.src = '../resources/sky.jpg';
img.onload = () => {
    const texture = context.createTexture();
    const uSampler = context.getUniformLocation(context.program, 'uSampler');

    context.clear(context.COLOR_BUFFER_BIT);
    context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, 1);
    context.activeTexture(context.TEXTURE0);
    context.bindTexture(context.TEXTURE_2D, texture);
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR);
    context.texImage2D(context.TEXTURE_2D, 0, context.RGB, context.RGB, context.UNSIGNED_BYTE, img);
    context.uniform1i(uSampler, 0);
    context.drawArrays(context.TRIANGLE_STRIP, 0, vertices.length / 4);
}