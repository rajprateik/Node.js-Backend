const jwt = require("jsonwebtoken");

const { jwtkey } = require("../keys");

exports.authCheck = (req, res, next) => {
  try {
    const token = req.headers["token"] || req.body.token;
    const decoded = jwt.verify(token, jwtkey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401);
    res.json({
      status: false,
      errorMessage: "Authentication Required! Refresh and try again.",
      error: error,
    });
  }
};
