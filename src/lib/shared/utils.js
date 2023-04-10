// Verify if the browser supports the type property,
// if supports we can use web workers to use multi threads on browser without any extra code
export function supportWorkerType() {
  let supports = false
  const tester = {
    get type() { supports = true }
  }

  try {
    new Worker('blob://', tester).terminate()
  } finally {
    return supports
  }
}

export async function loadExternalLibraries() {
  try {
    await Promise.all([
      import("https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.js"),
      import("https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.js"),
      import("https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.js"),
      import("https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.js"),
    ]);
    console.log('External libraries loaded successfully');
  } catch (error) {
    console.error('Failed to load external libraries', error);
  }
}

export function prepareRunChecker({ timerDelay }) {
  let lastEvent = Date.now()
  return {
    shouldRun() {
      const result = (Date.now() - lastEvent) > timerDelay
      if (result) lastEvent = Date.now()

      return result
    }
  }
}