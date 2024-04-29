const express = require('express')

const app = express()
const routes = require('./routes/routes')

app.use('/api', routes)

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`Server is listening on ${port}`))
