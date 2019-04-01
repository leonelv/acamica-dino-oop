class Game extends Renderer {
  constructor(canvas) {
    super(canvas)
    this.lost = false
  }

  async init() {
    this.MainSprite = new Image()

    this.MainSprite.src = 'img/sprite.png'

    await new Promise((res, rej) => {
      this.MainSprite.onload = res
      this.MainSprite.onerror = rej
      if (this.MainSprite.complete) {
        res()
      }
    })

    this.DinoSprites = [
      new Sprite(this.MainSprite, 848, 2, 44, 47), // still
      new Sprite(this.MainSprite, 936, 2, 44, 47), // walking 1
      new Sprite(this.MainSprite, 980, 2, 44, 47), // walking 2
      new Sprite(this.MainSprite, 1024, 2, 44, 47), // colission
      new Sprite(this.MainSprite, 1112, 19, 59, 30), // running 1
      new Sprite(this.MainSprite, 1171, 19, 59, 30) // running 2
    ]

    this.CactusSprites = new Array(6).fill(true).map((x, i) => new Sprite(this.MainSprite, 228 + i * 17, 2, 17, 35))
    this.BigCactusSprites = new Array(3).fill(true).map((x, i) => new Sprite(this.MainSprite, 332 + i * 49, 2, 49, 50))

    this.CloudSprite = [new Sprite(this.MainSprite, 86, 2, 47, 13)]

    this.FloorSprite = [new Sprite(this.MainSprite, 2, 54, 1200, 14)]

    this.Floor = new MovingElement(this.FloorSprite, 0, 130, 6, new MoveTo(-1200, null))
    this.Floor2 = new MovingElement(this.FloorSprite, 1200, 130, 6, new MoveTo(0, null))

    this.Player = new Dino(this.DinoSprites, 20, 89)

    this.Clouds = [
      new MovingElement(this.CloudSprite, 650, 10, 40, new MoveTo(-70, null)),
      new MovingElement(this.CloudSprite, 700 + 150, 35, 35, new MoveTo(-70, null)),
      new MovingElement(this.CloudSprite, 700 + 350, 25, 50, new MoveTo(-70, null))
    ]

    this.Cacti = new Array(1)
      .fill(true)
      .map((x, i, arr) => {
        const currentArray = Math.round(Math.random())
        const cacti = [this.CactusSprites, this.BigCactusSprites]

        const currentCactusModel = cacti[currentArray]
        const currentCactus = currentCactusModel[Math.round(Math.random() * (currentCactusModel.length - 1))]
        const posX = 300 + 100 * (Math.random() * 3)
        const mvtX = -1200
        return new Enemy([currentCactus], posX, currentArray ? 95 : 105, Math.abs(mvtX - posX) / 200, new MoveTo(mvtX, null))
      })
      .map((x, i, arr) => {
        const currentArray = Math.round(Math.random())
        const cacti = [this.CactusSprites, this.BigCactusSprites]

        const currentCactusModel = cacti[currentArray]
        const currentCactus = currentCactusModel[Math.round(Math.random() * (currentCactusModel.length - 1))]

        if (i !== 0) {
          const posX = arr[i - 1].startX + 100 * i + 1 + 120 * (Math.random() * 3)
          const mvtX = -1200
          return new Enemy([currentCactus], posX, x.y, Math.abs(mvtX - posX) / 200, new MoveTo(mvtX, null))
        } else {
          return x
        }
      })

    for (let i = 0; i < this.Clouds.length; i++) {
      const cloud = this.Clouds[i]
      this.renderElement(cloud)
    }

    this.renderElement(this.Floor)
    this.renderElement(this.Player)
    console.log(this.Cacti)
    for (let i = 0; i < this.Cacti.length; i++) {
      const cactus = this.Cacti[i]
      this.renderElement(cactus)
    }
  }

  start() {
    if (!this.lost) {
      requestAnimationFrame(() => {
        if (!this.startTime) {
          this.startTime = Date.now()
        }

        this.currentTime = Date.now()

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.Floor.start(this.startTime, this.currentTime)
        this.Floor2.start(this.startTime, this.currentTime)

        this.Player.walk(6)

        for (let i = 0; i < this.Clouds.length; i++) {
          const cloud = this.Clouds[i]
          cloud.start(this.startTime, this.currentTime)
          this.renderElement(cloud)
        }
        this.renderElement(this.Floor)
        this.renderElement(this.Floor2)
        this.renderElement(this.Player)

        for (let i = 0; i < this.Cacti.length; i++) {
          const cactus = this.Cacti[i]
          if (cactus && cactus.x < -50) {
            this.Cacti[i] = null
          }
          if (cactus) {
            cactus.start(this.startTime, this.currentTime)
            if (cactus.x <= 64 && this.Player.y > 80) {
              this.stop()
            }
            this.renderElement(cactus)
          }
        }

        if (!this.lost) {
          this.start()
        }
      })
    }
  }

  stop() {
    this.lost = true
    requestAnimationFrame(() => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.Player.dead()

      for (let i = 0; i < this.Clouds.length; i++) {
        const cloud = this.Clouds[i]
        this.renderElement(cloud)
      }

      this.renderElement(this.Floor)
      this.renderElement(this.Floor2)
      this.renderElement(this.Player)

      for (let i = 0; i < this.Cacti.length; i++) {
        const cactus = this.Cacti[i]
        if (cactus) {
          this.renderElement(cactus)
        }
      }
    })
  }
}
