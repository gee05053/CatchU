const express = require("express");
const router = express.Router();
const companyData = require("../data/company.json");

router.get("/", (req, res) => {
	const companies = companyData;
	res.send({ companies: companies });
});

router.post("/recruit", (req, res) => {
	res.send({ success: true });
});

module.exports = router;
