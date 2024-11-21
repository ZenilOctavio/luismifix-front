/**
 * Loads an image from a buffer of bytes and returns a URL representing the image.
 *
 * This function takes an array of numbers representing the byte data of an image,
 * creates a `Blob` object from that data, and generates a URL that can be used 
 * to display the image in an `<img>` element or as a background image.
 *
 * @param {number[]} buffer - An array of numbers representing the byte data of the image.
 * 
 * @returns {string} A URL string that can be used to reference the created image.
 * 
 * @example
 * 
 * const imageBuffer = [/* byte data here * /];
 * const imageUrl = loadImageFromBuffer(imageBuffer);
 * const imgElement = document.createElement('img');
 * imgElement.src = imageUrl;
 * document.body.appendChild(imgElement);
 */
export function loadImageFromBuffer(buffer: number[]) {
  const uIntArray = new Uint8Array(buffer)

  const blob = new Blob([uIntArray], { type: 'image/jpeg' })

  return URL.createObjectURL(blob)
}