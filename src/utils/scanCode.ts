function scanCode() {
  return new Promise((resolve, reject) => {
    uni.scanCode({
      onlyFromCamera: true,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
}

export default function useScanCode() {
  return {
    scanCode
  }
}
