require('dotenv').load()
require('isomorphic-fetch')
import url from 'url'
import net from 'net'
import dgram from 'dgram'
let socket = dgram.createSocket('udp4')

const state = {}
export default state

let cloudUrl = `https://api.particle.io/v1/devices/${process.env.PARTICLE_DEVICE_ID}/Address?access_token=${process.env.PARTICLE_TOKEN}`
fetch(cloudUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    let {port, hostname} = url.parse(data.result)
    state.send = message => {
      socket.send(message, 0, message.length, port, hostname, err => {
        if (err) throw err
        console.log(`UDP message sent to ${hostname}:${port}`)
      })
    }
    //state.client = net.connect(parseInt(port), hostname, () => console.log("Connected!"))
    //state.client.on('data', data => console.log(`${data}`))
  })
  .catch(err => {
    console.error(err)
    console.log(err.stack)
  })
