import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import { auth_routes } from './routes/auth_routes.js'
import { user_todo_routes } from './routes/user_todo_routes.js'

const PORT = process.env.PORT
const mongoDbAtlas = process.env.MONGO_URI

const app = express()
app.use(express.json())
app.use(auth_routes)
app.use('/user/', user_todo_routes)

app.listen(PORT, () => {
  mongoose.connect(mongoDbAtlas).then(()=> {

      console.log('listening port', PORT)
  })
})
