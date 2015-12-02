import state from './photon-client'
import {Server} from 'ws'

let server = new  Server({port: 8901})
server.on('connection', ws => {
  console.log(`Established WebSocket connection!`)
  ws.on('message', message => {
    console.log(`Received from WebSocket: ${message}`)
    if (state.client) state.client.write(message)
  })
})
