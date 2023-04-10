import "https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.js"
import "https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.js"
import "https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.js"
import "https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.js"

import Service from "./service.js"

// main thread we use this
// in worker we use self
const { tf, faceLandmarksDetection } = self
tf.setBackend('webgl')
const service = new Service({
  faceLandmarksDetection
})

console.log('loading tf model')
await service.loadModel()
console.log('tf model loaded')
postMessage('TF_MODEL_READY')

onmessage = async ({ data: videoFrame }) => {
  const blinked = await service.handleBlinks(videoFrame)
  if (!blinked) return;
  postMessage({ blinked })
}