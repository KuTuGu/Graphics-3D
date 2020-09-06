const VSHADER_SOURCE = `
attribute vec4 aPosition;
attribute vec4 aColor;
varying vec4 vColor;
void main(){
    gl_Position = aPosition;
    gl_PointSize = 10.0;
    vColor = aColor;
}
`;

const FSHADER_SOURCE = `
precision mediump float;
varying vec4 vColor;
void main(){
    gl_FragColor = vColor;
}
`; 

const vertices = new Float32Array([
    0.0, 0.5, 1.0, 0.0, 0.0,
    -0.5, -0.5, 0.0, 1.0, 0.0,
    0.5, -0.5, 0.0, 0.0, 1.0
]);
const FSIZE = vertices.BYTES_PER_ELEMENT;

const displayCanvas = document.getElementById("webgl"),
context = getWebGLContext(displayCanvas);

context.clearColor(0.0, 0.0, 0.0, 1);
context.clear(context.COLOR_BUFFER_BIT);

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
context.vertexAttribPointer(aPosition, 2, context.FLOAT, false, FSIZE * 5, 0);
context.enableVertexAttribArray(aPosition);

const aColor = context.getAttribLocation(context.program, 'aColor');
context.vertexAttribPointer(aColor, 3, context.FLOAT, false, FSIZE * 5, FSIZE * 2);
context.enableVertexAttribArray(aColor);

context.drawArrays(context.TRIANGLES, 0, vertices.length / 5);
