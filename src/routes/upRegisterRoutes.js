const { Router } = require("express");

//Middlewares
const { validateArchiveUpload } = require("../middlewares/validateArchive");
const { validateFields } = require("../middlewares/validateFields");

// Controllers
const { addUserImage } = require("../controllers/upload/upRegisterController");

const router = Router();

// Update image to user by id
router.patch("/users/:id", [validateArchiveUpload, validateFields], addUserImage);

module.exports = router;