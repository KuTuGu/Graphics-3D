const VSHADER_SOURCE = `
void main(){
    attribute vec4 aPosition;
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

context.drawArrays(context.POINTS, 0, 1);