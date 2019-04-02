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
  MovingElement.call(sprites, x, y, speed, movement, currentSprite)
}

// crear constructor de Dino, heredando el prototipo de MovingElement

function Dino(sprites, x, y, currentSprite) {
  //llamar al constructor
  EnviromentElement.call(sprites, x, y, currentSprite)
  this.steps = 0
}

Dino.prototype.walk = function(steps) {
  if (!this.walkStart) {
    this.walkStart = Date.now()
  }

  const miliseconds = Date.now() - this.walkStart - this.steps * 1000
  const animationRate = 1000 / steps

  const step = Math.floor(miliseconds / animationRate)

  if (!isEven(step)) {
    this.sprite = this.sprites[1]
  }

  if (isEven(step)) {
    this.sprite = this.sprites[2]
  }

  if (miliseconds >= 1000) {
    this.steps++
  }
}

Dino.prototype.jump = function() {
  if (!this.jumpStart) {
    this.jumpStart = Date.now()
  }

  const jumper = () => {
    let now = Date.now()
    let mills = now - this.jumpStart
    let movDelay = 400
    if (now < this.jumpStart + movDelay * 2) {
      if (now < this.jumpStart + movDelay) {
        this.y = map(mills, 0, movDelay, this.startY, this.startY - 85)
      } else {
        mills -= movDelay
        this.y = map(mills, 0, movDelay, this.startY - 85, this.startY)
      }
      requestAnimationFrame(jumper)
    } else {
      this.y = this.startY
      this.jumpStart = 0
    }
  }

  requestAnimationFrame(jumper)
}

Dino.prototype.dead = function() {
  this.sprite = this.sprites[3]
}

function MoveTo(x, y) {
  this.x = x
  this.y = y
}
