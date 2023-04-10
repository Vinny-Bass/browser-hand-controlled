export default class Controller {
  #view
  #service
  #worker
  constructor({ view, service, worker }) {
    this.#view = view
    this.#service = service
    this.#worker = this.#configureWorker(worker)

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
  }

  #configureWorker(worker) {
    worker.onmessage = (msg) => {
      if (msg.data === 'TF_MODEL_READY') {
        this.#view.enableButton()
        return;
      }
    }

    return worker
  }
}