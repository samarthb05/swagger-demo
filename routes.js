const express = require("express");
const {addbook}= require("./controller");
const router = express.Router();

router.post("/addBook",addbook);



module.exports = router;