import dat from 'dat-gui';

class Artwork {
  constructor() {
    this.artworkWrapper = document.querySelector('#artwork-wrapper');
    this.svg = this.artworkWrapper.querySelector('#svg');
    this.artworkWidth = this.artworkWrapper.clientWidth;
    this.artworkHeight = this.artworkWrapper.clientHeight;
    this.configData = {
      scaleFactor: "20",
      red: true,
      green: true,
      blue: true,
      stroke: true,
    }
  }

  init() {

    this.setDatGUI();

    this.bindEvents();
  }

  setDatGUI() {

    this.datGUI = new dat.GUI();

    this.datGUI.add(this.configData, 'scaleFactor');
    this.datGUI.add(this.configData, 'red');
    this.datGUI.add(this.configData, 'green');
    this.datGUI.add(this.configData, 'blue');
    this.datGUI.add(this.configData, 'stroke');
  }

  bindEvents() {

    const self = this;

    // Grab elements, create settings, etc.
    this.video = document.querySelector('#video');
    this.video.setAttribute('width', this.artworkWidth / 10);
    this.video.setAttribute('height', this.artworkHeight / 10);

    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
        self.video.src = window.URL.createObjectURL(stream);
        self.video.play();
      });
    }

    this.artworkWrapper.querySelector("#snap").addEventListener("click", () => this.takeSnap());

  }

  setUpCanvas() {

    this.video.setAttribute('data-scaled-width', Math.floor(this.artworkWidth / this.configData.scaleFactor));
    this.video.setAttribute('data-scaled-height', Math.floor(this.artworkHeight / this.configData.scaleFactor));

    this.canvas = document.querySelector('#canvas');
    this.canvas.setAttribute('width', this.video.dataset.scaledWidth);
    this.canvas.setAttribute('height', this.video.dataset.scaledHeight);
    this.context = canvas.getContext('2d');

  }


  takeSnap() {

    this.setUpCanvas();
    this.context.drawImage(this.video, 0, 0, this.video.dataset.scaledWidth, this.video.dataset.scaledHeight);
    this.manipulatePixels();

  }

  manipulatePixels() {

    //empty svg
    this.svg.innerHTML = '';
    let svgns = "http://www.w3.org/2000/svg";

    // git pixel-array of canvas
    let pixels = this.context.getImageData(0, 0, this.video.dataset.scaledWidth, this.video.dataset.scaledHeight);

    // loop over all pixels and save values for r g and b
    for (let y = 0; y < this.canvas.height; y++) {
      for (let x = 0; x < this.canvas.width; x++) {
        let index = (x + y * this.canvas.width) * 4;
        let r = pixels.data[index];
        let g = pixels.data[index + 1];
        let b = pixels.data[index + 2];

        // transform color-values into kind of 8-Bit values
        let R = Math.floor((r * 6 / 255) * 36) === 216 ? 255 : Math.floor((r * 6 / 255) * 36);
        let G = Math.floor((g * 6 / 255) * 36) === 216 ? 255 : Math.floor((g * 6 / 255) * 36);
        let B = Math.floor((b * 6 / 255) * 36) === 216 ? 255 : Math.floor((b * 6 / 255) * 36);

       if (R % 2 !== 0){
          r = Math.floor((R / 2)) * 2;
        }

       if (G % 2 !== 0){
         G = Math.floor((G / 2)) * 2;
        }

        if (B % 2 !== 0){
          B = Math.floor((B / 2)) * 2;
        }


        // get brightness of each pixel for black and white effect
        let brightness = Math.floor((r + g + b) / 3);

        // set each color chanel regrading to controls
        if(!this.configData.red) {
          R = 0;
        }

        if(!this.configData.green) {
          G = 0;
        }

        if(!this.configData.blue) {
          B = 0;
        }

        if(!this.configData.red && !this.configData.green && !this.configData.blue){
          R = brightness;
          G = brightness;
          B = brightness;
        }

        // draw rectangle with width and height of set scaleFactor
        let rect = document.createElementNS(svgns, 'rect');
        rect.setAttributeNS(null, 'x', x * this.configData.scaleFactor);
        rect.setAttributeNS(null, 'y', y * this.configData.scaleFactor);
        rect.setAttributeNS(null, 'height', `${this.configData.scaleFactor}`);
        rect.setAttributeNS(null, 'width', `${this.configData.scaleFactor}`);
        rect.setAttributeNS(null, 'fill', `rgb(${R}, ${G}, ${B})`);
        if(this.configData.stroke) {
          rect.setAttributeNS(null, 'stroke', 'black');
        }
        this.svg.appendChild(rect);
      }
    }
  }


}

export default Artwork;
