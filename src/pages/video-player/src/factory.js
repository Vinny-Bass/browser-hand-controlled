import Camera from "../../../lib/shared/camera.js"
import { supportWorkerType } from "../../../lib/shared/utils.js"
import Controller from "./controller.js"
import View from "./view.js"

async function getWorker() {
  if (supportWorkerType()) {
    console.log('has support to workers')
    const worker = new Worker('./src/worker.js', { type: 'module' })
    return worker
  }

  const workerMock = {
    async postMessage() {},
    onmessage(msg) {}
  }

  console.log("browser don't support workers, mocking worker")
  return workerMock
}

const worker = await getWorker()
const camera = await Camera.init()
const factory = {
  async initialize() {
    return Controller.initialize({
      view: new View(),
      worker,
      camera
    })
  }
}

export default factory