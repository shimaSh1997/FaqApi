// controllers/adminController.js
const Section = require("../models/section");
// const Topic = require('../models/Topic');
// const Question = require('../models/Question');
// const Answer = require('../models/Answer');
const verifyToken = require("../middleware/is-auth")

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
  console.log("reqRole:",req.role)
  // console.log('postSection:',req.headers['authorization'].split(' ')[1])
  // const tokenBarear = req.headers['authorization'].split(' ')[1]
  if(req.role !== 'admin'){
    res.status(403).json({message:"Admin priviledge required"})
  }
  Section.create({
    title: title,
  })
    .then((result) => {
      // console.log(result);
      return res.status(201).json(result);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
