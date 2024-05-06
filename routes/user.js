const express = require("express");

const router = express.Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/user")
// const sectionController = require("../controllers/sectionController");
// const topicController = require("../controllers/topicController");
// const questionController = require("../controllers/questionController");
// const answerController = require("../controllers/answerController");
const verifyToken = require("../middleware/is-auth").verifyToken;

// Admin routes for sections
// router.get("/sections", isAdmin, userController.getSections);
router.post("/sections", verifyToken, userController.postAddSection);
// router.put('/sections/:sectionId', isAdmin, adminController.updateSection);
// router.delete('/sections/:id', isAdmin, adminController.deleteSection);

// Admin routes for topics
// router.post('/topics', isAdmin, adminController.createTopic);
// router.put('/topics/:id', isAdmin, adminController.updateTopic);
// router.delete('/topics/:id', isAdmin, adminController.deleteTopic);

// Admin routes for questions
// router.post('/questions', isAdmin, adminController.createQuestion);
// router.put('/questions/:id', isAdmin, adminController.updateQuestion);
// router.delete('/questions/:id', isAdmin, adminController.deleteQuestion);

// Admin routes for answers
// router.post('/answers', isAdmin, adminController.createAnswer);
// router.put('/answers/:id', isAdmin, adminController.updateAnswer);
// router.delete('/answers/:id', isAdmin, adminController.deleteAnswer);

module.exports = router;
