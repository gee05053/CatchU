const express = require("express");
const router = express.Router();
const userData = require("../data/user.json");
const path = require("path");
const fs = require("fs");

router.post("/login", (req, res) => {
	const id = req.body.id;
	const password = req.body.password;
	console.log(userData);
	const user = userData.filter(
		(user) => user.user_id == id && user.password == password,
	);
	res.send({ user });
});

router.post("/signup", (req, res) => {
	const jsonPath = path.join(__dirname, "..", "data", "user.json");
	fs.readFile(jsonPath, function (err, data) {
		let json = JSON.parse(data);
		const newUser = {
			id: json[json.length - 1].id + 1,
			user_id: req.body.id,
			password: req.body.password,
			email: req.body.email,
			user_name: req.body.name,
			position: req.body.position,
		};
		json.push(newUser);
		fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
			if (err) {
				res.send({ success: fail });
			}
			res.send({ success: true });
		});
	});
});

module.exports = router;
