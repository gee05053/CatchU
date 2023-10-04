const express = require("express");
const app = express();
const userInfo = require("./router/userInfo");
const companyList = require("./router/companyList");

app.use("/user", userInfo);
app.use("/companies", companyList);

app.listen(5000, () => {
	console.log("server is listening at localhost", 5000);
});
