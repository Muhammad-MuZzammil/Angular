const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercise")
  .then(() => console.log("Connected to mongoDB..."))
  .catch(err => console.error("Could not connect to mongoDB", err));

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  price: Number,
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);

async function getCourse() {
  const courses = await Course.find()
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  console.log(courses);
}
getCourse();
