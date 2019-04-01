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

function MovingElement(sprites, x, y, speed, movement, currentSprite) {
  EnviromentElement.call(sprites, x, y, currentSprite)

  this.speed = speed
  this.movement = movement
  this.animationCount = 0
}

MovingElement.prototype.start = function(startTime, currentTime) {
  const currentValue = currentTime - startTime - this.animationCount * (this.speed * 1000)
  const MinimumInput = 0
  const MaximumInput = this.speed * 1000

  if (this.movement.x || this.movement.x === 0) {
    this.x = Math.round(map(currentValue, MinimumInput, MaximumInput, this.startX, this.movement.x))
  }

  if (this.movement.y || this.movement.y === 0) {
    this.y = Math.round(map(currentValue, MinimumInput, MaximumInput, this.startY, this.movement.y))
  }

  if (currentValue > this.speed * 1000 - 1) {
    this.animationCount++
  }
  if (currentTime - startTime < 1000 && !this.stop) {
    stop = true
  }
}

// crear constructor de Enemy, heredando el prototipo de MovingElement

function Enemy(sprites, x, y, speed, movement, currentSprite) {
  //llamar al constructor
}

// crear constructor de Dino, heredando el prototipo de MovingElement

function Dino(sprites, x, y, currentSprite) {
  //llamar al constructor
  this.steps = 0
}

function MoveTo(x, y) {
  this.x = x
  this.y = y
}
