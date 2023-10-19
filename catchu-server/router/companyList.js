const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const companyData = require("../data/company.json");

router.get("/", (req, res) => {
	const companies = companyData;
	res.send({ companies: companies });
});

router.post("/uploadImages", (req, res) => {
	res.send({ success: true });
});

function formatDate(date) {
	let year = date.getFullYear();
	let month = date.getMonth();
	let day = date.getDate();
	if (month.length < 2) {
		month = "0" + month;
	}
	if (day.length < 2) {
		day = "0" + day;
	}
	return [year, month, day].join("-");
}
router.post("/recruit", (req, res) => {
	const jsonPath = path.join(__dirname, "..", "data", "company.json");
	fs.readFile(jsonPath, function (err, data) {
		let json = JSON.parse(data);
		let newRecruit = req.body;
		newRecruit.id = json[json.length - 1].id + 1;
		newRecruit.keywords = [];
		newRecruit.upload_date = formatDate(new Date());
		json.push(newRecruit);
		fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
			if (err) {
				res.send({ success: false });
			}
			res.send({ success: true });
		});
	});
});

module.exports = router;
