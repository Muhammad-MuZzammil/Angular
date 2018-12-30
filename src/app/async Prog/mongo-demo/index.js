const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error('Could not connect to MongoDB', err))

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: boolean
})

const Course = mongoose.model('Course', courseSchema)
const course = new Course({
  name: 'Node.js Course',
  author: 'Ali',
  tags: ['Node', 'backend'],
  isPublished: true
})
