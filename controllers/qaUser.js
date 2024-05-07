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

exports.getViewCount = async (req, res, next) => {
  const qaId = req.params.id;
  try {
    const { count, rows } = await userQa.findAndCountAll({ where: { qaId } });
    console.log("count:", count);
    res.status(201).json({ message: "count view" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getIsLike = async (req, res, next) => {
  const qaId = req.params.id;
  const isLike = req.body.isLike;
  try {
    const { count, rows } = await userQa.findAndCountAll({where:{isLike:true} });
    console.log("count:", count);
    res.status(201).json({ message: "count view" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
