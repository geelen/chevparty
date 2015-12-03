import state from './photon-client'
import {Server} from 'ws'
var dgram = require('dgram')

let server = new  Server({port: 8901})
server.on('connection', ws => {
  console.log(`Established WebSocket connection!`)
  ws.on('message', (message, flags) => {
    console.log(message.length)
    console.log(`Received from WebSocket: ${message.toString('hex')}`)
    //if (state.client) {
      //state.client.write("a" + message.slice(0, 50))
    //}
  })
})
