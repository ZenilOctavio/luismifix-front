export function loadImageFromBuffer(buffer: number[]) {
  const uIntArray = new Uint8Array(buffer)

  const blob = new Blob([uIntArray], { type: 'image/jpeg' })

  return URL.createObjectURL(blob)
}