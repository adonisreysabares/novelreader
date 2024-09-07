import express from 'express'
import bodyParser from 'body-parser'
import middlewareLogging from './middlewares/logging.js'

import routerNovel from './routers/novelData.js'


const app = express()
const PORT = 3000
app.use(bodyParser.json())

app.use('/novel',middlewareLogging, routerNovel)
app.listen(PORT,()=>{
    console.log(`Server is listening at http://localhost:${PORT}`)
})