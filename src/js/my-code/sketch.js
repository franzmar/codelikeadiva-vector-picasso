import p5 from 'p5';
import 'p5/lib/addons/p5.dom';

// Sketch scope
const Sketch = (p5) => {

  // Variables scoped within p5
  // const canvasWidth = document.querySelector('#artwork-wrapper').clientWidth;
  // const canvasHeight = document.querySelector('#artwork-wrapper').clientHeight;;
  // let capture = null;
  // const d = new Star(500, 300, 4);

  // make library globally available
  window.p5 = p5;

  // Setup function
  // ======================================
  p5.setup = () => {
    // let canvas = p5.createCanvas(canvasWidth, canvasHeight);
    // capture = p5.createCapture(p5.VIDEO);
    // capture.size(320, 240);
    // canvas.parent('artwork-wrapper');
  }

  // Draw function
  // ======================================
  p5.draw = () => {
    // p5.loadPixels();
    //
    // for (let y = 0; y < canvasHeight; y++) {
    //   for (let x = 0; x < canvasWidth; x++) {
    //     let index = (x + y * canvasWidth)*4;
    //     p5.pixels[index] = 255;
    //     p5.pixels[index+1] = 0;
    //     p5.pixels[index+2] = 255;
    //     p5.pixels[index+3] = 255;
    //   }
    // }
    //
    // p5.updatePixels();
  }
}

export default Sketch;
