const Course = require("../models/course/course");

exports.getCourseById = async (courseId) => {
  return await Course.findOne({
    _id: courseId
  });
};