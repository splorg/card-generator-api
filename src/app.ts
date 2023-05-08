import express from 'express'
import 'express-async-errors'
import cors from 'cors'

import db from './database'
import routes from './routes'
import { unknownEndpoint, errorHandler } from './middlewares'

db.getInstance()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', express.static('public'))
app.use('/api', routes)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
