export default class View {
  #initEyeRecognitionBtn = document.querySelector('#init')
  #statusOutput = document.querySelector('#status')

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