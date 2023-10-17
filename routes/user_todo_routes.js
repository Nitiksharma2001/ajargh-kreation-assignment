import express from 'express'
import jwt from 'jsonwebtoken'
import { userModel } from '../model/userModel.js'
import { todoModel } from '../model/todoModel.js'
export const user_todo_routes = express()

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.substring(7)
  jwt.verify(token, process.env.JWT_KEY, (err, resp) => {
    if (resp) {
      req.user = resp
      next()
    } else {
      res.json({ message: 'invalid token' })
    }
  })
}
// get all todos
user_todo_routes.get('/todos', authenticate, async (req, res) => {
  const todos = await todoModel.find({ owner: req.user._id }).exec()
  res.json(todos)
})

// add a todo
user_todo_routes.post('/addtodo', authenticate, async (req, res) => {
  const { title, description } = req.body
  const { _id } = req.user
  try {
    const newTodo = await new todoModel({
      title,
      description,
      owner: _id,
    }).save()
    const user = await userModel.findOne({ _id }).select('-password')
    user.todos.push(newTodo._id)
    await user.save()
    res.json({ message: 'todo created', todo: newTodo, user })
  } catch (err) {
    res.json({ message: err })
  }
})

// delete a todo
user_todo_routes.post('/deletetodo', authenticate, async (req, res) => {
  const { todoid } = req.body
  const { _id } = req.user
  try {
    const deletedTodo = await todoModel.deleteOne({ _id: todoid }).exec()
    const user = await userModel.findOne({ _id }).select('-password')
    user.todos.pull(todoid)
    await user.save()
    res.json({ message: 'todo deleted', todo: deletedTodo, user })
  } catch (err) {
    res.json({ message: err })
  }
})

// update a todo
user_todo_routes.post('/updatetodo', authenticate, async (req, res) => {
  const { todoid, title, description, isDone } = req.body
  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(
      todoid,
      { title, description, isDone },
      { new: true }
    )
    res.json({ message: 'todo deleted', todo: updatedTodo })
  } catch (err) {
    res.json({ message: err })
  }
})
