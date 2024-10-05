import app from './app'
import swaggerDocs from './swagger/swagger'

const port = process.env.APP_PORT || 3001

app.listen(port, () => {
  swaggerDocs(app, Number(port))

  console.log(`Server is running on http://localhost:${port}`)
})
