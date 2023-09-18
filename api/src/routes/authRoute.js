const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { User } = require('../db')
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

//login local
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Error al iniciar sesión" });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error al iniciar sesión" });
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({ token });
    });
  })(req, res, next);
});

//traer user autenticado
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id)
    if (!user) {
      return res.status(404).json({ message: "No se encontró el usuario" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});


module.exports = router;