export default class Controller {
  #view
  #camera
  #worker
  constructor({ view, service, worker, camera }) {
    this.#view = view
    this.#worker = this.#configureWorker(worker)
    this.#camera = camera

    // using my this class 'this'
    this.#view.configureOnBtnClick(this.onBtnStart.bind(this))
  }

  static async initialize(dependencies) {
    const controller = new Controller(dependencies)
    controller.log('the eye signals recognition is not initialized yet')
    return controller.init()
  }

  async init() {
    console.log("init")
  }

  log(text) {
    this.#view.log(`logger: ${text}`)
  }

  onBtnStart() {
    this.log('initializing eye recognition...')
    this.loop()
  }

  loop() {
    const video = this.#camera.video
    const img = this.#view.getVideoFrame(video)
    this.#worker.send(img)
    this.log('detecting eye blink')

    setTimeout(() => this.loop, 100)
  }

  #configureWorker(worker) {
    let ready = false
    worker.onmessage = (msg) => {
      if (msg.data === 'TF_MODEL_READY') {
        console.log('Worker is ready')
        ready = true
        this.#view.enableButton()
        return;
      }
      const blinked = msg.data.blinked
      console.log({ blinked })
    }

    return {
      send(msg) {
        if (!ready) return;
        worker.postMessage(msg)
      }
    }
  }
}