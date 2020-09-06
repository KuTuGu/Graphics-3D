const VSHADER_SOURCE = `
attribute vec4 aPosition;
attribute float aPointSize;
void main(){
    gl_Position = aPosition;
    gl_PointSize = aPointSize;
}
`;

const FSHADER_SOURCE = `
void main(){
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`; 

const vertices = new Float32Array([
    0.0, 0.5, 10.0,
    -0.5, -0.5, 20.0,
    0.5, -0.5, 30.0
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
context.vertexAttribPointer(aPosition, 2, context.FLOAT, false, FSIZE * 3, 0);
context.enableVertexAttribArray(aPosition);

const aPointSize = context.getAttribLocation(context.program, 'aPointSize');
context.vertexAttribPointer(aPointSize, 1, context.FLOAT, false, FSIZE * 3, FSIZE * 2);
context.enableVertexAttribArray(aPointSize);

context.drawArrays(context.POINTS, 0, vertices.length / 3);
