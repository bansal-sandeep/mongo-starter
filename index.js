const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb://localhost/playground',
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to mongoDB...'))
  .catch(err => console.log('Could not connect to mongoDB', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'HTML course',
    author: 'Sandeep Bansal',
    tags: ['Frontend', 'html'],
    isPublished: false
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses(params) {
  // const courses = await Course.find();

  // const courses = await Course.find({ isPublished: false }).and({
  //   author: 'Sandeep Bansal'
  // });

  const courses = await Course.find({ isPublished: true })
    .limit(2)
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });

  console.log(courses);
}

getCourses();
console.clear();
