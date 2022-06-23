const express = require("express");


const {
    getAllUsers, registerUser, loginUser
} = require("./../controllers/authController");

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);



module.exports = router;