import { createAdapter } from '@socket.io/redis-adapter'
import { Server as SocketServer } from 'socket.io'
import { Errors } from '@src/errors/errorCodes'
// import i18n from '@src/libs/i18n'
import Logger from '@src/libs/logger'
import RedisClient, { redisPublisher, redisSubscriber } from '@src/libs/redis'
import { getLocalizedError, isTrustedError } from '@src/utils/error.utils'
import argumentsDecoratorSocketMiddleware from './middlewares/argumentsDecoratorSocket.middleware'
import namespaces from './namespaces'

// TODO: specify the particular origin
const socketCorsOptions = {
  cors: { origin: { origin: '*' } },
  path: '/api/socket/'
}

const socketServer = new SocketServer(socketCorsOptions)
socketServer.on('new_namespace', (namespace) => {
  namespace.use((socket, next) => {
    console.log("socket connected.")
    // const req = socket.request

    // i18n.init(req)

    socket.on('error', (error) => {
      if (isTrustedError(error)) {
        socket.emit('error', { data: {}, errors: [getLocalizedError(error, socket.request.__)] })
      } else {
        Logger.error(
          (error.name || InternalServerErrorType.name),
          {
            message: error.message || error.description,
            fault: error.fields
          })
        socket.emit('error', { data: {}, errors: [getLocalizedError(Errors.INTERNAL_SERVER_ERROR, socket.request.__)] })
      }
    })

    socket.use(argumentsDecoratorSocketMiddleware(socket))

    next()
  })
})

socketServer.adapter(createAdapter(redisPublisher, redisSubscriber))

namespaces(socketServer)

export default socketServer
