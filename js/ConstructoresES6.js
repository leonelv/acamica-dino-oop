class EnviromentElement {
  constructor(sprites, x, y, currentSprite = 0) {
    Object.assign(this, { sprites, x, y, startX: x, startY: y, sprite: sprites[currentSprite] })
  }
}

class Sprite {
  constructor(img, x, y, width, height) {
    let image

    if (typeof img === 'string' || img instanceof String) {
      image = new Image()
      image.src = img
    }

    if (img instanceof Image) {
      image = img
    }

    Object.assign(this, { image, x, y, width, height })
  }
}

class MovingElement extends EnviromentElement {
  constructor(sprites, x, y, speed, movement, currentSprite) {
    super(sprites, x, y, currentSprite)
    Object.assign(this, { movement, speed })
    this.animationCount = 0
  }

  start(startTime, currentTime) {
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
}

class Enemy extends MovingElement {
  constructor(sprites, x, y, speed, movement, currentSprite) {
    super(sprites, x, y, speed, movement, currentSprite)
  }
}

class Dino extends EnviromentElement {
  constructor(sprites, x, y, currentSprite) {
    super(sprites, x, y, currentSprite)
    this.steps = 0
  }

  walk(steps) {
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

  jump() {
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

  dead() {
    this.sprite = this.sprites[3]
  }
}

class MoveTo {
  constructor(x, y) {
    Object.assign(this, { x, y })
  }
}
