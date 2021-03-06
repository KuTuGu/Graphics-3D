const VSHADER_SOURCE = `
attribute vec4 aPosition;
void main(){
    gl_Position = aPosition;
    gl_PointSize = 10.0;
}
`;

const FSHADER_SOURCE = `
void main(){
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`; 


const displayCanvas = document.getElementById("webgl"),
context = getWebGLContext(displayCanvas);

context.clearColor(0.0, 0.0, 0.0, 1);
context.clear(context.COLOR_BUFFER_BIT);

if(!initShaders(context, VSHADER_SOURCE, FSHADER_SOURCE)){
throw new Error('Fail to initialize shaders.');
}

const aPosition = context.getAttribLocation(context.program, 'aPosition');
context.vertexAttrib1f(aPosition, 0.0);
context.drawArrays(context.POINTS, 0, 1);