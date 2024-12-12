const express = require("express");
const { addBook,getBooks,getBook,editBook,deleteBook } = require("./controller");
const router = express.Router();

router.post("/addBook", addBook);
router.get("/books",getBooks);
router.get("/book/:id",getBook);
router.patch("/updateBook/:id", editBook);
router.delete("/deleteBook/:id",deleteBook);


module.exports = router;
