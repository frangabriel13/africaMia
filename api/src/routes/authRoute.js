const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { User } = require('../db')
const {adminMiddleware} = require('../middlewares/authMiddleware')

const router = Router();

//login local
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      console.error("Error al autenticar:", err);
      return res.status(500).json({ message: "Error al iniciar sesión" });
    }
    if (!user) {
      console.log("Usuario no autenticado. Info:", info);
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) {
        console.error("Error al iniciar sesión:", err);
        return res.status(500).json({ message: "Error al iniciar sesión" });
      }
      console.log("Inicio de sesión exitoso para el usuario:", user.email);
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      console.log('Usuario autenticado: ', {token})
      return res.status(200).json({ token });
    });
  })(req, res, next);
});

//traer user autenticado
router.get("/me", adminMiddleware, async (req, res) => {
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