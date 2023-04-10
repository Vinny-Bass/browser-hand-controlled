import Camera from "../../lib/shared/camera.js"
import { supportWorkerType } from "../../lib/shared/utils.js"
import Controller from "./controller.js"
import Service from "./service.js"
import View from "./view.js"

async function getWorker() {
  if (supportWorkerType()) {
    console.log('has support to workers')
    return new Worker('./src/worker.js', { type: 'module' })
  }

  const workerMock = {
    async postMessage() {},
    onmessage(msg) {}
  }

  console.log("browser don't support workers, mocking worker")
  return workerMock()
}

const camera = Camera.init()
const factory = {
  async initialize() {
    return Controller.initialize({
      view: new View(),
      service: new Service({})
    })
  }
}

export default factory