const Tutor = require("../models/tutor/tutor");

exports.getTutorById = async (tutorid) => {
  return await Tutor.findOne({
    _id: tutorid
  });
};