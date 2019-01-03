const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: {
    // if u required author sub document u can apply validation author document itself..
    type: String,
    required: true
  },
  bio: String,
  website: String
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    // author: {
    //   type: authorSchema, //working on single author
    //   required: true
    // }
    authors: [authorSchema] //working on single authors
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    // author for single
    authors //for Array
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

// async function updateAuthor(courseId){ // updated via findById
//   const course = await Course.findById(courseId)
//   course.author.name = 'Mosh hamedani'
//   course.save()
//   console.log(course)
// }

async function updateAuthor(courseId) { // directly updated single author
  // directly updated
  const course = await Course.update(
    { _id: courseId },
    {
      // $set:{
      //   'author.name':'demonz'
      // }
      $unset: {
        author: ""
      }
    }
  );
}

async function addAuthor(courseId) { //add author in authors array
  const course = await Course.findById(courseId);
  course.authors.push(new Author({ name: "kane" }));
  course.save();
  console.log(course);
}

async function removeAuthor(courseId, authorId) { //remove author in authors array
  const course = await Course.findById(courseId);
  const result = course.authors.id(authorId)
  result.remove();
  course.save()
   console.log(course);
}

removeAuthor('5c2e1fc21e645d59307097c5','5c2e1fc21e645d59307097c4')

// addAuthor('5c2e1e0a0a322b1b907a3859')
// updateAuthor("5c2e1459690c703de02925d9");
// createCourse('Node Course', new Author({ name: 'Mosh' }));
// createCourse("Node Course", [
//   new Author({ name: "Saad" }),
//   new Author({ name: "demonz" })
// ]);
