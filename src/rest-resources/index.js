import config from '@src/configs/app.config'
import routes from '@src/rest-resources/routes'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware'

const app = express()

// Security headers
app.use(helmet())

// Logging
app.use(morgan('tiny'))

// Parsing request bodies
app.use(express.json()) // Built-in JSON body parser
app.use(express.urlencoded({ extended: true })) // Built-in URL-encoded parser

app.use(
  cors({
    origin: config.get('app.origin').split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  })
)

// API Routes
app.use(routes)

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ status: 'Not Found', message: 'The requested resource does not exist' })
})

// Global error handler
app.use(errorHandlerMiddleware)

export default app
