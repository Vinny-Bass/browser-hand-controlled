export default class View {
  #initEyeRecognitionBtn = document.querySelector('#init')
  #statusOutput = document.querySelector('#status')
  #videoFrameCanvas = document.createElement('canvas')
  #canvasContext = this.#videoFrameCanvas.getContext('2d', { willReadFrequently: true })
  #videoElement = document.querySelector("#video")

  getVideoFrame(video) {
    const canvas = this.#videoFrameCanvas
    const [width, height] = [video.videoWidth, video.videoHeight]
    canvas.width = width
    canvas.height = height

    this.#canvasContext.drawImage(video, 0, 0, width, height)
    return this.#canvasContext.getImageData(0, 0, width, height)
  }

  tooglePlayVideo() {
    if (this.#videoElement.paused) {
      this.#videoElement.play()
      return;
    }
    this.#videoElement.pause()
  }

  enableButton() {
    this.#initEyeRecognitionBtn.disabled = false
  }

  configureOnBtnClick(fn) {
    this.#initEyeRecognitionBtn.addEventListener('click', fn)
  }

  log(text) {
    this.#statusOutput.innerHTML = text
  }
}