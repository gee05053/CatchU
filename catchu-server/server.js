const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const user_info = require("./router/user_info");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.use("/user", user_info);

app.listen(5000, () => {
	console.log("server is listening at localhost", 5000);
});
