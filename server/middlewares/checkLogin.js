const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("authorization"); // viết thường
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({
      success: false,
      message: "User is not login !!!",
    });

  try {
    const decoded = jwt.verify(token, process.env.PASSJWT);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message: "Invalid or expired token !!!",
    });
  }
};

module.exports = verifyToken;
