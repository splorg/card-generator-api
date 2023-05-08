import { PORT } from './utils/config'
import app from './app'

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
  .on('error', err => {
    console.log(err)
  })
