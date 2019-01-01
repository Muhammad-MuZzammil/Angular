const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
    // match:/pattern/ //RegExp
  },
  category: {
    type: String,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    // uppercase:true
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 100);
      },
      message: "A Course should have only one tag"
    }
  },
  date: { type: Date, default: Date.now }, // min or max validator also used in dates
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: v => Math.round(v), // get called when read/get course
    set: v => Math.round(v) // set called when create course
  }
});
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Node.js Course",
    category: "web",
    author: "demonz",
    tags: ["backend"],
    isPublished: true,
    price: 15.8
  });
  try {
    // course.validate(err => console.log(err.message)); validate property provided by mongoDB
    const result = await course.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}
// createCourse();
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
  const courses = await Course.find({ _id: '5c2b485ce5700438b4dfec0a' })
    // .find({ author: "Ali", isPublished: true }) // find with author and isPublished
    // .find({ price: { $gt: 10, $lte: 20 } }) // find price b/w 10 and 20
    // .find({ price: { $in: [10, 15, 20] } }) // find price is 10 15 and 20
    // .find() // syntex of logical operators
    // .or([{ isPublished: true }, { author: "Ali" }]) // isPublish true or author Ali  koi ek ho
    // .and([{ isPublished: true , author: "Ali" }]) // isPublish true and author Ali both compulsory
    // Regular Expression
    // .find({ author: /^Ali hamdani$/i }) // ^start with , /^Ali hamdani$/i i for case insensitive,End with$, .*Ali.* agay peeche kuch b ho Ali hona chaye
    // .skip((pageNumber - 1) * pageSize) // skip method is used to implement pagination and skip  method skip the documents of the previous page
    // .limit(pageSize) // limit records to show ,  limit(pageSize) => we can get documents of the given page
    .sort({ name: 1 }) // 1 for ascending and -1 for descending
    .select({ author: 1, isPublished: 1, price: 1 }); // properties in select will show on console or frontend etc
  // .count(); //return number/count of documents match find criteria
  console.log(courses);
}
getCourse()

// async function updateCourse(id) {
//   // 2 approuches: querry 1st get data update it and save, update 1st in db optionally get opdated docs
//   // -querry 1st get data update it and save
//   const course = await Course.findById(id);
//   console.log(course);

//   if (!course) return;
//   // 2 way to update docs:
//   //  i)
//   course.author = "demonz";
//   course.name = "React Course";

//   // ii)
//   // course.set({
//   //   author:'demonz',
//   //   name:'React course'
//   // })
//   const result = await course.save();
//   console.log(result);
// }
// updateCourse("5c29d0fb3810881a0c44ad23");

// update 1st in db optionally get opdated docs

async function updateCourse(id) {
  //const course = await Course.update({ _id: id }, { only update doc but not return
  // $set: {
  //   isPublished: true,
  //   name: "React Course"
  // }
  //}); //
  const course = await Course.findByIdAndUpdate(
    // update doc and return
    id,
    {
      $set: {
        isPublished: true,
        name: "React Course"
      }
    },
    { new: true }
  );
  console.log(course);
}

// updateCourse("5c29d0fb3810881a0c44ad23");

async function removeCourse(id) {
  // const result = await Course.deleteMany({ isPublished: true }); delete Many Items
  // const result = await Course.deleteOne({ isPublished: true }); // delete one and  1st item
  // const result = await Course.deleteOne({ _id:id }); // delete specific item
  const course = await Course.findByIdAndRemove({ _id: id });
  console.log(course);
}

// removeCourse("5c2b390f58b5e9189cf4be9e");
