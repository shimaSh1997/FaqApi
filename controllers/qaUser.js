const User = require("../models/user");
const userQa = require("../models/userQa");
const Qa = require("../models/qA");

exports.postAddQaUser = async (req, res, next) => {
  const userId = req.body.userId;
  const qaId = req.body.qaId;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const qa = await User.findByPk(qaId);
    if (!qa) {
      return res.status(404).json({ message: "qa not found" });
    }
    const existingAssociation = await userQa.findOne({
      where: { userId, qaId },
    });
    if (existingAssociation) {
      return res
        .status(400)
        .json({ message: "qa has relation with this user" });
    }
    await userQa.create({ userId, qaId });
    res.status(201).json({ message: "qa has relate to user successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllFeatureOfQA = async (req, res, next) => {
  const qaId = req.params.id;
  const isLike = req.body.isLike;
  console.log("isLike:::", isLike);
  try {
    var { count, rows } = await userQa.findAndCountAll({
      where: { isLike: true, qaId: qaId },
    });
    const likeCount = count;
    console.log("LikeCount", likeCount);

    var { count, rows } = await userQa.findAndCountAll({
      where: { isLike: false, qaId: qaId },
    });
    const dislikeCount = count;
    console.log("dislikeCount:", dislikeCount);

    var { count, rows } = await userQa.findAndCountAll({ where: { qaId } });
    const viewCount = count;
    console.log("viewCount:", viewCount);

    res.status(201).json({
      message: { likeCount, dislikeCount, viewCount },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
