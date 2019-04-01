/* walk(steps) {
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
} */
