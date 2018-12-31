const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Ali",
    tags: ["angular", "frontend"],
    isPublished: false
  });

  const result = await course.save();
  console.log(result);
}

async function getCourse() {
  // use $ sign to know that this is a operator and use Curly braces {} to write a opeartor
  // $eq (equal to)
  // $neq (not equal to)
  // $gt(greater than)
  // $gte (greater than or equal to)
  // $lt (less than)
  // $lte (less than or equal to)
  // $in (is data exist in items e.g ({price :{$in:[10,20,30]}}) )
  // nin (not in)
  // Logical Operaots
  // or
  // and
  const pageNumber = 2;
  const pageSize = 10;
  const courses = await Course
    .find({ author: "Ali", isPublished: true }) // find with author and isPublished
    // .find({ price: { $gt: 10, $lte: 20 } }) // find price b/w 10 and 20
    // .find({ price: { $in: [10, 15, 20] } }) // find price is 10 15 and 20
    // .find() // syntex of logical operators
    // .or([{ isPublished: true }, { author: "Ali" }]) // isPublish true or author Ali  koi ek ho
    // .and([{ isPublished: true , author: "Ali" }]) // isPublish true and author Ali both compulsory
    // Regular Expression
    // .find({ author: /^Ali hamdani$/i }) // ^start with , /^Ali hamdani$/i i for case insensitive,End with$, .*Ali.* agay peeche kuch b ho Ali hona chaye
    .skip((pageNumber - 1) * pageSize) // skip method is used to implement pagination and skip  method skip the documents of the previous page
    .limit(pageSize) // limit records to show ,  limit(pageSize) => we can get documents of the given page
    .sort({ name: 1 }) // 1 for ascending and -1 for descending
    .select({ author: 1, isPublished: 1 }); // properties in select will show on console or frontend etc
  // .count(); //return number/count of documents match find criteria
  console.log(courses);
}
getCourse();
