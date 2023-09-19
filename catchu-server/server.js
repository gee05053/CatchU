const express = require("express");
const app = express();

const { Client } = require("pg");
const Query = require("pg").Query;

var client = new Client({
	user: "test",
	host: "localhost",
	database: "catchu",
	password: "!test123",
	port: 5432,
});

client.connect((err) => {
	if (err) {
		console.error("connection error", err.stack);
	} else {
		console.log("success!");
	}
});

const query = {
	text: "SELECT * FROM users",
};

client
	.query(query)
	.then((res) => {
		console.log(res);
		client.end();
	})
	.catch((e) => console.error(e.stack));

app.get("/", (req, res) => {
	res.json({
		success: true,
		test: "test this code",
	});
});

app.listen(5000, () => {
	console.log("server is listening at localhost", 5000);
});
