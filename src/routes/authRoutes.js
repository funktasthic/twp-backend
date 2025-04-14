const { Router } = require("express");

// Controllers
const { register } = require("../controllers/authController");
const { login } = require("../controllers/authController");
const { validateToken } = require("../controllers/authController");

const router = Router();

// Login user
router.post('/login', login);

// Register an user
router.post('/register', register);

// Verify token
router.get('/verify-token', validateToken);


module.exports = router;