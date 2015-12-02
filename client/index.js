var host = window.document.location.host.replace(/:.*/, '');
const [w,h] = [300,1];
const hex = uint8 => ('00' + uint8.toString(16).toUpperCase()).slice(-2)
const colors = ['red','green','blue']

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
const cycleColor = () => {
  ctx.fillStyle = colors[colorIndex]
  colorIndex = (colorIndex + 1) % colors.length
}
canvas.addEventListener('mousedown', e => {
  cycleColor()
  down = true
  lastX = Math.round(w * e.offsetX / clientWidth)
  ctx.fillRect(lastX, 0, 1, 1)
})
canvas.addEventListener('mousemove', e => {
  if (!down) return
  let x = Math.round(w * e.offsetX / clientWidth)
  ctx.fillRect(Math.min(lastX || x, x), 0, Math.abs((lastX || x+1) - x), 1)
  lastX = x
})
document.addEventListener('mouseup', () => down = false)

setInterval(() => {
  if (!ws.readyState === 1) return console.log("Waiting for WebSocket")
  let {data} = ctx.getImageData(0,0,w,h)
  let colours = []
  for (var i = 0; i < data.length; i+=4) {
    colours.push(`#${hex(data[i])}${hex(data[i+1])}${hex(data[i+2])} `)
  }
  console.log(colours.join(''))
}, 1000)

export default null
