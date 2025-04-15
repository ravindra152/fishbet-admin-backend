import express from 'express'
import superRouter from './api'
import healthCheck from '@src/libs/healthCheck'
// import { seedGames } from 'scripts/seedGames'

const routes = express.Router()
routes.use('/api/v1', superRouter)

routes.get('/healthcheck', async (_, res) => {
  try {
    const response = await healthCheck()
    res.json(response)
  } catch (error) {
    res.status(503)
    res.send()
  }
})

export default routes
