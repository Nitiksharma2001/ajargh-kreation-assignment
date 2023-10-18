import mongoose from 'mongoose'
const todoSchema = new mongoose.Schema({
  title: {
    type: 'String',
    required: true,
    maxLength: 30,
  },
  description: {
    type: 'String',
    required: true,
  },
  isDone: {
    type:Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref:'User',
    required: true,
  },
})

export const todoModel = mongoose.model('Todo', todoSchema)
