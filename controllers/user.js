// controllers/adminController.js
const Section = require("../models/section");
// const Topic = require('../models/Topic');
// const Question = require('../models/Question');
// const Answer = require('../models/Answer');

// get sections
exports.getSections = (req, res, next) => {
  Section.findAll()
    .then((sections) => {
      return res.json(sections);
    })
    .catch((err) => {
       res.status(500).json({ error: err.message });
    });
};

// Create a new section
exports.postAddSection = (req, res, next) => {
  const title = req.body.title;
  Section.create({
    title: title,
  })
    .then((result) => {
      console.log(result);
      return res.status(201).json(result);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
// exports.updateSection = (req, res, next) => {
//   const sectionId = req.params.sectionId;
//   const title = req.body.title;
//   Section.update({ title, where: { id: sectionId } })
//     .then((section) => {
//       res.json(section);
//     })
//     .catch((err) => res.status(500).json({ error: err.message }));
// };
