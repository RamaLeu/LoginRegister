const express = require("express");
const { protect } = require('../controllers/authController');


const {
    getAllUsers, registerUser, loginUser
} = require("./../controllers/authController");

const router = express.Router();

router.route("/").get(protect, getAllUsers);
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);



module.exports = router;