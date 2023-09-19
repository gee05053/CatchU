const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

const { Client } = require("pg");

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

app.get("/", (req, res) => {
	res.send({
		success: true,
		test: "test this code",
	});
});

app.post("/text", (req, res) => {
	const text1 = req.body.intext;
	console.log(text1);
	app.get("/text", (req, res) => {
		res.send(text1);
	});
});

app.use("/username", (req, res) => {
	res.json({ username: "kim" });
});

app.listen(5000, () => {
	console.log("server is listening at localhost", 5000);
});
