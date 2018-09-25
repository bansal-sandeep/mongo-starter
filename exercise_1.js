// ------------------- Comparision Query Document -------------------- //
// eq (equal to)
// ne (not equal to)
// lt (less than)
// lte (less than or equal to)
// gt (greater than)
// gte (greater than or equal to)
// in
// nin (not in)

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
  price: Number,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  // // price = 100
  // const courses = await Course.find({ price: 100 });

  // // price (greater than 200 and less than 400)
  // const courses = await Course.find({ price: { $gt: 200, $lt: 400 } });

  // price (300, 400, 500)
  const courses = await Course.find({ price: { $in: [300, 400, 500] } });

  console.log(courses);
}

getCourses();
