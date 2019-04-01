function EnviromentElement(sprites, x, y, currentSprite = 0) {
  this.sprites = sprites
  this.x = x
  this.y = y
  this.currentSprite = currentSprite
  this.sprite = sprites[currentSprite]
}

function Sprite(img, x, y, width, height) {
  let image

  if (typeof img === 'string' || img instanceof String) {
    image = new Image()
    image.src = img
  }

  if (img instanceof Image) {
    image = img
  }

  this.image = image
  this.x = x
  this.y = y
  this.width = width
  this.height = height
}

fun