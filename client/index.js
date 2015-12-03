import debounce from 'debounce'

var host = window.document.location.host.replace(/:.*/, '');
const [w,h] = [300,1];
const hex = uint8 => ('00' + uint8.toString(16).toUpperCase()).slice(-2)
const colors = ['#f00','#0f0','#00f']

var ws = new WebSocket('ws://' + host + ':8901');
ws.onopen = () => {
  ws.send('A')
  setTimeout(() => ws.send('B'), 1000)
}

let canvas = document.querySelector('canvas')
let {clientWidth} = canvas
let ctx = canvas.getContext('2d')
ctx.fillStyle = "black"
ctx.fillRect(0,0,w,h)

let down = false
let colorIndex = 0
let lastX = 0
const emit = () => {
  console.log("emit!!")
  let {data} = ctx.getImageData(0, 0, w, h)
  let output = new Uint8ClampedArray(Math.round(data.length * 3 / 4))
  for (var i = 0; i < data.length / 4; i++) {
    output[3 * i] = data[4 * i] | 0
    output[3 * i + 1] = data[4 * i + 1] | 0
    output[3 * i + 2] = data[4 * i + 2] | 0
  }
  if (ws.readyState !== 1) return console.log("Waiting for WebSocket")
  ws.send(output)
}
const cycleColor = () => {
  ctx.fillStyle = colors[colorIndex]
  colorIndex = (colorIndex + 1) % colors.length
}
const draw = (x, width) => {
  console.log("draw!!")
  ctx.fillRect(x, 0, width, 1)
  requestAnimationFrame(emit)
}
canvas.addEventListener('mousedown', e => {
  cycleColor()
  down = true
  lastX = Math.round(w * e.offsetX / clientWidth)
  draw(lastX,1)
})
canvas.addEventListener('mousemove', e => {
  if (!down) return
  let x = Math.round(w * e.offsetX / clientWidth)
  draw(Math.min(lastX || x, x), Math.abs((lastX || x+1) - x))
  lastX = x
})
document.addEventListener('mouseup', () => down = false)

export default null
