const express = require("express");
const app = express();
const cors = require("cors");
const userInfo = require("./router/userInfo");
const companyList = require("./router/companyList");
const account = require("./router/account");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userInfo);
app.use("/companies", companyList);
app.use("/account", account);

app.listen(5000, () => {
	console.log("server is listening at localhost", 5000);
});
