const joi = require("joi");
const bookModel = require("./model");

//joi validation
const bookSchemavalidate = new joi.object({
  name: joi.string().required(),
  author: joi.string().required(),
  price: joi.number().required(),
  booktype: joi
    .string()
    .valid("adventure", "autobiography", "comic")
    .required(),
});

module.exports.addBook = async (req, res) => {
  try {
    const { error } = bookSchemavalidate.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error", data: error.details });
    }
    const newBook = new bookModel(req.body);
    const book = await newBook.save();
    return res.status(201).json({ message: "book added", data: book });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /addBook:
 *   post:
 *     summary: Add a new book
 *     description: Adds a new book to the collection
 *     operationId: addBook
 *     tags:
 *       - Books
 *     requestBody:
 *       description: The book details to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the book
 *                 example: "The Alchemist"
 *               author:
 *                 type: string
 *                 description: The author of the book
 *                 example: "Paulo Coelho"
 *               price:
 *                 type: number
 *                 description: The price of the book
 *                 example: 19.99
 *               booktype:
 *                 type: string
 *                 description: The type/category of the book
 *                 enum: ["adventure", "autobiography", "comic"]
 *                 example: "adventure"
 *     responses:
 *       201:
 *         description: Book successfully added
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

//get books
module.exports.getBooks = async (req, res) => {
  try {
    const books = await bookModel.find();
    if (!books || !books.length === 0) {
      return res.status(400).json({ message: "Book not found!" });
    }
    return res
      .status(200)
      .json({ message: "Books fetched successfully!", data: books });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Fetches all the books from the collection.
 *     operationId: getBooks
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Books fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Books fetched successfully!"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "The Great Gatsby"
 *                       author:
 *                         type: string
 *                         example: "F. Scott Fitzgerald"
 *                       year:
 *                         type: integer
 *                         example: 1925
 *       400:
 *         description: No books found
 *       500:
 *         description: Server error
 */

//get book by id
module.exports.getBook = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (!book || !book.length === 0) {
      return res.status(400).json({ message: "Book not found!" });
    }
    return res
      .status(200)
      .json({ message: "Book fetched successfully!", data: book });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /book/{id}:
 *   get:
 *     summary: Get a book by ID
 *     description: Fetches a book from the collection by its unique ID.
 *     operationId: getBook
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the book to fetch
 *         required: true
 *         schema:
 *           type: string
 *         example: "60c72b2f5f1b2c001f4b4b1a"
 *     responses:
 *       200:
 *         description: Book fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book fetched successfully!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "The Great Gatsby"
 *                     author:
 *                       type: string
 *                       example: "F. Scott Fitzgerald"
 *                     year:
 *                       type: integer
 *                       example: 1925
 *       400:
 *         description: Book not found
 *       500:
 *         description: Server error
 */

//edit book by id
module.exports.editBook = async (req, res) => {
  try {
    const updatebook = await bookModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatebook) {
      return res.status(400).json({ message: "Book not found!" });
    }
    return res
      .status(200)
      .json({ message: "Book updated successfully!", data: updatebook });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /updateBook/{id}:
 *   patch:
 *     summary: Edit a book by ID
 *     description: Updates the details of a book in the collection by its unique ID.
 *     operationId: editBook
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the book to update
 *         required: true
 *         schema:
 *           type: string
 *         example: "60c72b2f5f1b2c001f4b4b1a"
 *       - name: book
 *         in: body
 *         description: The data to update the book with
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               description: The title of the book
 *               example: "The Great Gatsby"
 *             author:
 *               type: string
 *               description: The author of the book
 *               example: "F. Scott Fitzgerald"
 *             publishedDate:
 *               type: string
 *               format: date
 *               description: The publication date of the book
 *               example: "1925-04-10"
 *             genre:
 *               type: string
 *               description: The genre of the book
 *               example: "Fiction"
 *             pages:
 *               type: integer
 *               description: The number of pages in the book
 *               example: 218
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book updated successfully!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "The Great Gatsby"
 *                     author:
 *                       type: string
 *                       example: "F. Scott Fitzgerald"
 *                     publishedDate:
 *                       type: string
 *                       format: date
 *                       example: "1925-04-10"
 *                     genre:
 *                       type: string
 *                       example: "Fiction"
 *                     pages:
 *                       type: integer
 *                       example: 218
 *       400:
 *         description: Book not found
 *       500:
 *         description: Server error
 */

//delete book
module.exports.deleteBook = async (req, res) => {
  try {
    const removeBook = await bookModel.findByIdAndDelete(req.params.id);
    if (!removeBook) {
      return res.status(400).json({ message: "Book not found!" });
    }
    return res
      .status(200)
      .json({ message: "Book deleted successfully!", data: removeBook });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /deleteBook/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     description: Deletes a book from the collection by its unique ID.
 *     operationId: deleteBook
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the book to delete
 *         required: true
 *         schema:
 *           type: string
 *         example: "60c72b2f5f1b2c001f4b4b1a"
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book deleted successfully!"
 *                 data:
 *                   type: object
 *                   description: The details of the deleted book.
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "The Great Gatsby"
 *                     author:
 *                       type: string
 *                       example: "F. Scott Fitzgerald"
 *                     publishedDate:
 *                       type: string
 *                       format: date
 *                       example: "1925-04-10"
 *                     genre:
 *                       type: string
 *                       example: "Fiction"
 *                     pages:
 *                       type: integer
 *                       example: 218
 *       400:
 *         description: Book not found
 *       500:
 *         description: Internal Server Error
 */
