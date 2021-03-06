const VSHADER_SOURCE = `
attribute vec4 aPosition;
void main(){
    gl_Position = aPosition;
}
`;

const FSHADER_SOURCE = `
void main(){
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`; 

const vertices = new Float32Array([
    -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5
]);

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
context.vertexAttribPointer(aPosition, 2, context.FLOAT, false, 0, 0);
context.enableVertexAttribArray(aPosition);

context.drawArrays(context.TRIANGLE_FAN, 0, vertices.length / 2);