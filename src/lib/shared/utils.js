// Verify if the browser supports the type property,
// if supports we can use web workers to use multi threads on browser without any extra code
function supportWorkerType() {
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

export {
  supportWorkerType
}