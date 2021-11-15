const express = require('express');
const router = express.Router();
const {
  getBooks,
  deleteBook,
  addBook,
  getSingleBook,
  updateBook,
} = require('../controllers/books');

router.route('/').get(getBooks).post(addBook);
router.route('/:id').get(getSingleBook).delete(deleteBook).patch(updateBook);

module.exports = router;
