const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercise")
  .then(() => console.log("Connected to mongoDB..."))
  .catch(err => console.error("Could not connect to mongoDB", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  price: Number,
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);

async function getCourse() {
  return await Course.find({
    isPublished: true
    // tags: { $in: ["frontend", "backend"] }
  })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/ }])
    // .or([{ tags: "frontend" },{tags:'backend'}])
    .sort("-price")
    .select("name author price");
}
async function run() {
  const courses = await getCourse();
  console.log(courses);
}
run();
