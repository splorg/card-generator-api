import { type Request, type Response, type NextFunction } from 'express'

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): any => {
  if (error.name === 'CastError') return res.status(404).json({ error: 'Invalid ID.' })

  if (error.name === 'ValidationError') return res.status(400).json({ error: error.message })

  res.status(500).json({ error: error.message })

  next(error)
}

export default errorHandler
