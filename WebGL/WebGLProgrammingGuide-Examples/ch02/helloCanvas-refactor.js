const displayCanvas = document.getElementById("webgl"),
      context = getWebGLContext(displayCanvas);

      context.clearColor(0.0, 0.0, 0.0, 1);
      context.clear(context.COLOR_BUFFER_BIT);