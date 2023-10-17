const express = require("express");
const router = express.Router();
const userData = require("../data/user.json");
const nodeMailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const generateRandomNumber = () => {
	let strNumber = "";
	for (let i = 0; i < 6; i++) {
		strNumber += Math.floor(Math.random() * 10);
	}
	return Number(strNumber);
};

const transporter = nodeMailer.createTransport({
	service: "gmail",
	port: 587,
	host: "smtp.gmail.com",
	secure: false,
	requireTLS: true,
	auth: {
		user: process.env.USER_GMAIL,
		pass: process.env.GMAIL_APP_PASSWORD,
	},
});

let searchUser;

router.get("/findId", (req, res) => {
	const searchUser = userData.filter(
		(user) => req.query.email === user.email,
	);
	if (searchUser.length === 0) {
		res.send({
			findId: undefined,
		});
	} else {
		res.send({
			findId: searchUser[0].user_id,
		});
	}
});

router.post("/findPassword", async (req, res) => {
	searchUser = userData.filter(
		(user) =>
			req.body.email === user.email && req.body.id === user.user_id,
	);
	if (searchUser.length === 0) {
		res.send({ checkNumber: undefined });
	} else {
		const checkNumber = generateRandomNumber();
		await transporter.sendMail({
			from: process.env.USER_GMAIL,
			to: req.body.email,
			subject: "CatchU 비밀번호 찾기 인증번호입니다.",
			text: `인증번호는 ${checkNumber} 입니다.`,
		});
		res.send({ checkNumber: checkNumber });
	}
});

router.post("/changePassword", (req, res) => {
	const jsonPath = path.join(__dirname, "..", "data", "user.json");
	fs.readFile(jsonPath, function (err, data) {
		let json = JSON.parse(data);
		const newUser = {
			id: searchUser[0].id,
			user_id: searchUser[0].user_id,
			password: req.body.password,
			email: searchUser[0].email,
			user_name: searchUser[0].user_name,
			position: searchUser[0].position,
		};
		const index = json.findIndex((user) => user.id === searchUser[0].id);
		json[index] = newUser;
		fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
			if (err) {
				res.send({ success: false });
			}
			res.send({ success: true });
		});
	});
});

router.put("/changeProfile", (req, res) => {
	const jsonPath = path.join(__dirname, "..", "data", "user.json");
	fs.readFile(jsonPath, function (err, data) {
		let json = JSON.parse(data);
		const newUser = {
			id: req.body.id,
			user_id: req.body.userId,
			password: req.body.newPassword,
			email: req.body.email,
			user_name: req.body.userName,
			position: req.body.position,
		};
		const index = json.findIndex((user) => user.id === req.body.id);
		json[index] = newUser;
		fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
			if (err) {
				res.send({ success: false });
			}
			res.send({ success: true, newUserData: newUser });
		});
	});
});

module.exports = router;
