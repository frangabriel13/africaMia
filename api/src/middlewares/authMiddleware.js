const jwt = require("jsonwebtoken");
const { User } = require("../db");

const adminMiddleware = async (req, res, next) => {
  try {
    let user = null;
    if (req.isAuthenticated()) {
      if (req.user.isAdmin) {
        user = req.user;
      }
    } else if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;
      user = await User.findByPk(userId);
      if (!user.isAdmin) {
        throw new Error();
      }
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: "Token expirado" });
    } else {
      res.status(401).json({ error: "Acceso no autorizado" });
    }
  }
};

module.exports = { adminMiddleware };