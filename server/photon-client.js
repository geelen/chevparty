require('dotenv').load()
require('isomorphic-fetch')
import url from 'url'
import net from 'net'

const state = {}
export default state

let cloudUrl = `https://api.particle.io/v1/devices/${process.env.PARTICLE_DEVICE_ID}/Address?access_token=${process.env.PARTICLE_TOKEN}`
fetch(cloudUrl)
  .then(response => response.json())
  .then(data => {
    if (!data.result) console.err(data)
    let {port, hostname} = url.parse(data.result)
    state.port = port
    state.hostname = hostname
    //state.client = net.connect(parseInt(port), hostname, () => console.log("Connected!"))
    //state.client.on('data', data => console.log(`${data}`))
  })
  .catch(err => {
    console.error(err)
    console.log(err.stack)
  })
