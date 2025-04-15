import { Emitter } from '@socket.io/redis-emitter'
import redisPublisher from './redis'

// const redisDetail = RedisClient.getRedisClient()
const socketEmitter = new Emitter(redisPublisher)

export default socketEmitter
