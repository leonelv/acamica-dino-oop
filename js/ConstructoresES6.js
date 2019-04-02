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

//extender desde MovingELement
class Enemy {
  constructor(sprites, x, y, speed, movement, currentSprite) {
    //llamar a super
  }
}

//extender desde EnviromentElement

class Dino {
  constructor(sprites, x, y, currentSprite) {
    // llamar a super
    this.steps = 0
  }

  //agregar metodos
}

class MoveTo {
  constructor(x, y) {
    Object.assign(this, { x, y })
  }
}
