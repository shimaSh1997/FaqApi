// controllers/adminController.js
const Section = require("../models/section");
const Topic = require("../models/topic");
// const Question = require('../models/Question');
// const Answer = require('../models/Answer');
const verifyToken = require("../middleware/is-auth");
const sectionTopic = require("../models/sectionTopic.js");
const qaTopic = require("../models/qaTopic");
const QA = require("../models/qA.js");

// get sections
// exports.getSections = (req, res, next) => {
//   Section.findAll()
//     .then((sections) => {
//       return res.json(sections);
//     })
//     .catch((err) => {
//        res.status(500).json({ error: err.message });
//     });
// };

// Create a new section
exports.postAddSection = (req, res, next) => {
  const section_name = req.body.section_name;
  console.log("reqRole:", req.role);
  // console.log('postSection:',req.headers['authorization'].split(' ')[1])
  // const tokenBarear = req.headers['authorization'].split(' ')[1]
  if (req.role !== "admin") {
    res.status(403).json({ message: "Admin privilege required" });
  }
  Section.create({
    section_name: section_name,
  })
    .then((result) => {
      // console.log(result);
      return res.status(201).json(result);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.updateSection = async (req, res, next) => {
  const sectionId = req.params.id;
  console.log("sectionId log", sectionId);
  const section_name = req.body.section_name;
  try {
    const section = await Section.findByPk(sectionId);
    console.log("section log", section);
    if (!section) {
      return res.status(404).json({ message: "section not found" });
    }
    section.dataValues.section_name = section_name;
    section.dataValues.sectionId = sectionId;
    // console.log('in updateSection: ', section)
    await section.save();
    res.status(201).json({ message: "update section successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
exports.deleteSection = async (req, res, next) => {
  const sectionId = req.params.id;
  try {
    const section = await Section.findByPk(sectionId);
    if (!section) {
      return res.status(404).json({ message: "section not found" });
    }
    await section.destroy();
    res.status(201).json({ message: "section soft deleted successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.postAddTopic = (req, res, next) => {
  const topic_name = req.body.topic_name;
  console.log("reqRole:", req.role);
  // console.log('postSection:',req.headers['authorization'].split(' ')[1])
  // const tokenBarear = req.headers['authorization'].split(' ')[1]

  if (req.role !== "admin") {
    res.status(403).json({ message: "Admin privilege required" });
  }
  Topic.create({
    topic_name: topic_name,
  })
    .then((result) => {
      // console.log(result);
      return res.status(201).json(result);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
exports.postAddSectionTopic = async (req, res, next) => {
  const sectionId = req.body.sectionId;
  const topicId = req.body.topicId;
  try {
    const section = await Section.findByPk(sectionId);
    if (!section) {
      return res.status(404).json({ message: "section not found" });
    }
    const topic = await Section.findByPk(topicId);
    if (!topic) {
      return res.status(404).json({ message: "topic not found" });
    }
    const existingAssociation = await sectionTopic.findOne({
      where: { sectionId, topicId },
    });
    if (existingAssociation) {
      return res
        .status(400)
        .json({ message: "topic added already to the section" });
    }
    await sectionTopic.create({ sectionId, topicId });
    res.status(201).json({ message: "topic added to section successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.postQuestionAnswer = (req, res, next) => {
  const question = req.body.question;
  const answer = req.body.answer;
  console.log("reqRole:", req.role);
  // console.log('postSection:',req.headers['authorization'].split(' ')[1])
  // const tokenBarear = req.headers['authorization'].split(' ')[1]
  if (req.role !== "admin") {
    res.status(403).json({ message: "Admin privilege required" });
  }
  QA.create({
    question: question,
    answer: answer,
  })
    .then((result) => {
      // console.log(result);
      return res.status(201).json(result);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
exports.updateQuestionAnswer = async (req, res, next) => {
  const qaId = req.params.id;
  console.log("sectionId log", qaId);
  const question = req.body.question;
  const answer = req.body.answer;
  try {
    const qa = await QA.findByPk(qaId);
    console.log("section log", qa);
    if (!qa) {
      return res.status(404).json({ message: "qa not found" });
    }
    qa.dataValues.question = question;
    qa.dataValues.answer = answer;
    // console.log('in updateSection: ', section)
    await qa.save();
    res.status(201).json({ message: "update qa successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
