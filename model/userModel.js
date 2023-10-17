import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  name: {
    type: 'String',
    required: true,
    maxLength: 30,
  },
  email: {
    type: 'String',
    required: true,
  },
  password: {
    type: 'String',
    required: true,
  },
  todos: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Todo',
      required: true,
    },
  ],
})

export const userModel = mongoose.model('User', userSchema)
