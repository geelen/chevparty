import state from './photon-client'
import {Server} from 'ws'

let server = new  Server({port: 8901})
server.on('connection', ws => {
  console.log(`Established WebSocket connection!`)
  ws.on('message', (message, flags) => {
    //console.log(message.length)
    //console.log(`Received from WebSocket: ${message.toString('hex')}`)
    if (state.send) state.send(message)
  })
})
