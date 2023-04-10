export default class Controller {
  constructor({}) {

  }

  static async initialize(dependencies) {
    const controller = new Controller(dependencies)
    return controller.init()
  }

  async init() {
    console.log("init")
  }
}