
const VSHADER_SOURCE = `
attribute vec4 aPosition;
uniform float aCos, aSin;
void main(){
    gl_Position.x = aPosition.x * aCos - aPosition.y * aSin;
    gl_Position.y = aPosition.x * aSin + aPosition.y * aCos;
    gl_Position.z = aPosition.z;
    gl_Position.w = 1.0;
}
`;

const FSHADER_SOURCE = `
void main(){
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`; 

const vertices = new Float32Array([
    0.0, 0.5, -0.5, -0.5, 0.5, -0.5
]);

const ANGLE = 90.0, RADIAN = Math.PI * ANGLE / 180.0;

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

const aPosition = context.getAttribLocation(context.program, 'aPosition'),
      aCos = context.getUniformLocation(context.program, 'aCos');
      aSin = context.getUniformLocation(context.program, 'aSin');

context.vertexAttribPointer(aPosition, 2, context.FLOAT, false, 0, 0);
context.enableVertexAttribArray(aPosition);
context.uniform1f(aCos, Math.cos(RADIAN));
context.uniform1f(aSin, Math.sin(RADIAN));

context.drawArrays(context.TRIANGLES, 0, vertices.length / 2);