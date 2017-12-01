import p5 from 'p5';
import Sketch from './sketch';

class Artwork {
  constructor() {
    this.artworkWrapper = document.querySelector('#artwork-wrapper');
    this.capture = null
    this.canvasWidth = document.querySelector('#artwork-wrapper').clientWidth;
    this.canvasHeight = document.querySelector('#artwork-wrapper').clientHeight;
    this.scale = 16;
  }

  init() {

    let self = this;

    let button;

    self.sketch = new p5(Sketch);

    this.sketch.setup = () => {
      let canvas = this.sketch.createCanvas(this.canvasWidth, this.canvasHeight);
      this.capture = this.sketch.createCapture(this.sketch.VIDEO);
      this.capture.size(this.sketch.width/16, this.sketch.height/16);
      canvas.parent('artwork-wrapper');
      button = this.sketch.createButton('snap');
      button.mousePressed(() => self.takeSnap());
    }

    this.sketch.draw = () => {

      this.capture.loadPixels();
      this.sketch.loadPixels();
      for (let y = 0; y < this.sketch.height; y++) {
        for (let x = 0; x < this.sketch.width; x++) {
          let index = (x + y * this.sketch.width) * 4;
          this.sketch.pixels[index] =  this.capture.pixels[index];
          this.sketch.pixels[index + 1] =  this.capture.pixels[index + 1];
          this.sketch.pixels[index + 2] =  this.capture.pixels[index + 2];
          this.sketch.pixels[index + 3] = 255;

          //this.sketch.rect(x, y, this.scale, this.scale);
        }
      }

      this.sketch.updatePixels();
    };

  }

  takeSnap() {

    // this.sketch.image(this.capture, 0, 0, this.canvasWidth, this.canvasHeight);
    //
    // this.manipulateImage();
  }

  manipulateImage() {

    this.capture.loadPixels();
    this.sketch.loadPixels();
    for (let y = 0; y < this.sketch.height; y++) {
      for (let x = 0; x < this.sketch.width; x++) {
        let index = (x + y * this.sketch.width) * 4;
        this.sketch.pixels[index + 0] =  this.capture.pixels[index + 0];
        this.sketch.pixels[index + 1] =  this.capture.pixels[index + 1];
        this.sketch.pixels[index + 2] =  this.capture.pixels[index + 2];
        this.sketch.pixels[index + 3] = 255;

        this.sketch.rect(x, y, this.scale, this.scale);
      }
    }

    this.sketch.updatePixels();

    let canvas = this.sketch.canvas;
    let ctx = canvas.getContext('2d');

    let data = ctx.getImageData(0, 0, this.sketch.width, this.sketch.height);

    console.log(data);
  }


}

export default Artwork;
