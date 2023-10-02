const express = require("express");
const router = express.Router();
const userData = require("../data/user.json");

router.post("/login", (req, res) => {
	const id = req.body.id;
	const password = req.body.password;
	const user = userData.filter(
		(user) => user.user_id == id && user.password == password,
	);
	res.send({ user });
});

module.exports = router;
