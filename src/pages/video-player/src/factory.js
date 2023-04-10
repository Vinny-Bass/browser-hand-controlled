import Camera from "../../../lib/shared/camera.js"
import { supportWorkerType, loadExternalLibraries } from "../../../lib/shared/utils.js"
import Controller from "./controller.js"
import Service from "./service.js"
import View from "./view.js"

async function getWorker() {
  if (supportWorkerType()) {
    console.log('Browser supports web workers')
    const worker = new Worker('./src/worker.js', { type: 'module' })
    return worker
  }

  console.warn("Browser doesn't support web workers")
  console.warn('Fallback to mock worker')

  await import("https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.js")
  await import("https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.js")
  await import("https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.js")
  await import("https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.js")
  const service = new Service({
    faceLandmarksDetection: window.faceLandmarksDetection
  })
  const workerMock = {
    async postMessage(videoFrame) {
      const blinked = await service.handleBlinks(videoFrame)
      if (!blinked) return;
      workerMock.onmessage({ data: { blinked } })
    },
    onmessage(msg) {}
  }

  console.log('loading tf model')
  await service.loadModel()
  console.log('tf model loaded')

  setTimeout(() => workerMock.onmessage({ data: 'TF_MODEL_READY' }), 500);

  return workerMock
}

const factory = {
  async initialize() {
    const worker = await getWorker()
    const camera = await Camera.init()

    return Controller.initialize({
      view: new View(),
      worker,
      camera
    })
  }
}

export default factory