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

module.exports.addbook = async (req, res) => {
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
 * /addbook:
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
