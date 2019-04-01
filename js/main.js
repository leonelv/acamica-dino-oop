document.addEventListener('DOMContentLoaded', main)

function main() {
  const { body } = document
  const canvas = document.createElement('canvas')

  let started = false

  canvas.height = 150
  canvas.width = 600

  body.appendChild(canvas)

  const renderInstance = new Game(canvas)
  renderInstance.init()

  window.addEventListener('keyup', e => {
    if (!started) {
      renderInstance.start()
      started = true
    } else {
      renderInstance.Player.jump()
    }
  })
}
