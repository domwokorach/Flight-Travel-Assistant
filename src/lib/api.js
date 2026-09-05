export function simulateRequest(data, { delay = 500, shouldFail = false } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error('Request failed'))
      else resolve(data)
    }, delay)
  })
}
