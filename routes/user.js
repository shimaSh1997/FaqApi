const express = require("express");

const router = express.Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const qaController = require("../controllers/qaUser");
const verifyToken = require("../middleware/is-auth").verifyToken;

// Admin routes for sections
// router.get("/sections", isAdmin, userController.getSections);
router.post("/sections", verifyToken, userController.postAddSection);
router.put("/sections/:id", verifyToken, userController.updateSection);
router.delete("/sections/:id", verifyToken, userController.deleteSection);

// Admin routes for topics
router.post("/topics", verifyToken, userController.postAddTopic);
router.post("/sectionTopic", verifyToken, userController.postAddSectionTopic);

// Admin routes for questions&answers
router.post("/qa", verifyToken, userController.postQuestionAnswer);
router.put("/qa/:id", verifyToken, userController.updateQuestionAnswer);
// router.delete('/qa/:id', verifyToken, userController.deleteQuestionAnswer);

//routes for questionAnswer for incrementing viewCount
router.post("/qaUser", qaController.postAddQaUser);

// routes for questionAnswer for show isLike or dislike
router.get("/qaLike/:id", verifyToken, qaController.getAllFeatureOfQA);
// User routes for view Sections
router.get("/viewSections", verifyToken, userController.getSections);
// User routes for view Topics
router.get("/viewTopics", verifyToken, userController.getTopics);

// User routes for view Question and Answers
router.get("/viewQa", verifyToken, userController.getQa);

// User can be search based on question in here
router.get("/searchQuestion",verifyToken,userController.searchBasedQuestion)

// sortTopicBasedBySection
router.get('/sortTopicBasedBySection',verifyToken,userController.sortTopicBasedBySection)
router.get('/sortQaBasedByTopics',verifyToken,userController.sortQaBasedByTopics)

module.exports = router;
