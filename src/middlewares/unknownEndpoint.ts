import { type Request, type Response } from 'express'

const unknownEndpoint = (req: Request, res: Response): void => {
  res.status(404).json({ error: 'Unknown endpoint.' })
}

export default unknownEndpoint
