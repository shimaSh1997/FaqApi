const express = require("express");

const router = express.Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const qaController = require("../controllers/qaUser");

// const sectionController = require("../controllers/sectionController");
// const topicController = require("../controllers/topicController");
// const questionController = require("../controllers/questionController");
// const answerController = require("../controllers/answerController");
const verifyToken = require("../middleware/is-auth").verifyToken;

// Admin routes for sections
// router.get("/sections", isAdmin, userController.getSections);
router.post("/sections", verifyToken, userController.postAddSection);
router.put("/sections/:id", verifyToken, userController.updateSection);
router.delete("/sections/:id", verifyToken, userController.deleteSection);

// Admin routes for topics
router.post("/topics", verifyToken, userController.postAddTopic);
router.post("/sectionTopic", verifyToken, userController.postAddSectionTopic);
// router.put('/topics/:id', isAdmin, adminController.updateTopic);
// router.delete('/topics/:id', isAdmin, adminController.deleteTopic);

// Admin routes for questions&answers
router.post("/qa", verifyToken, userController.postQuestionAnswer);
router.put("/qa/:id", verifyToken, userController.updateQuestionAnswer);
// router.delete('/qa/:id', verifyToken, userController.deleteQuestionAnswer);

// User routes for questionAnswer for incrementing viewCount
router.post("/qaUser", qaController.postAddQaUser);
router.get("/qa/:id", verifyToken, qaController.getViewCount);

// User routes for view Sections

// User routes for view Topics

// User routes for view Question and Answers

// Admin routes for answers
// router.post('/answers', isAdmin, adminController.createAnswer);
// router.put('/answers/:id', isAdmin, adminController.updateAnswer);
// router.delete('/answers/:id', isAdmin, adminController.deleteAnswer);

module.exports = router;
