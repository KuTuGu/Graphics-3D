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

if(!initShaders(context, VSHADER_SOURCE, FSHADER_SOURCE)){
    throw new Error('Fail to initialize shaders.');
}

const aPosition = context.getAttribLocation(context.program, 'aPosition');

displayCanvas.addEventListener('click', (e) => {
    context.clear(context.COLOR_BUFFER_BIT);
    
    context.vertexAttrib2f(aPosition, (e.offsetX - displayCanvas.width / 2) / (displayCanvas.width / 2), (-e.offsetY + displayCanvas.height / 2) / (displayCanvas.height / 2));

    context.drawArrays(context.POINTS, 0, 1);
})


