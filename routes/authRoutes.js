const express = require("express");
const router = express.Router();

router.route("/").get(async (req, res) => {})

router.route("/signup").get(async (req, res) => {})

router.route("/otp").get(async (req, res) => {})
module.exports = router;