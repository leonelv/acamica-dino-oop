class Renderer {
  constructor(canvas) {
    Object.assign(this, { canvas, context: canvas.getContext('2d') })
  }

  renderElement(Element) {
    const { sprite, x, y } = Element
    const { x: spriteX, y: spriteY, width, height, image } = sprite
    this.context.drawImage(image, spriteX, spriteY, width, height, x, y, width, height)
  }
}
