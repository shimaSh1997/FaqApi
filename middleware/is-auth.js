exports.isAdmin = (req, res, next) => {
  if (req.session.userRole !== "admin") {
    return res.status(403).json({ error: "this error" });
  }
  next()
};
