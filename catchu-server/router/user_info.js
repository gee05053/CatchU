const express = require("express");
const router = express.Router();
const { Client } = require("pg");

var dbClient = new Client({
	user: "test",
	host: "localhost",
	database: "catchu",
	password: "!test123",
	port: 5432,
});

dbClient.connect((err) => {
	if (err) {
		console.error("DB connection error", err.stack);
	} else {
		console.log("DB connection success!");
	}
});

router.post("/login", (req, res) => {
	const id = req.body.id;
	const password = req.body.password;
	dbClient.query(
		`SELECT * FROM users WHERE user_id = '${id}' and password='${password}'`,
		(err, result) => {
			if (err) {
				res.send(err);
			} else {
				res.send(result.rows);
			}
		},
	);
});

module.exports = router;
