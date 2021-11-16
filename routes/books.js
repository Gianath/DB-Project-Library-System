const express = require('express');
const router = express.Router();
const {
  getBooks,
  deleteBook,
  addBook,
  getSingleBook,
  updateBook,
  returnBook,
  borrowBook,
} = require('../controllers/books');

router.route('/').get(getBooks).post(addBook);
router.route('/:id').get(getSingleBook).delete(deleteBook).patch(updateBook);
router.route('/return/:id').patch(returnBook);
router.route('/borrow').post(borrowBook);

module.exports = router;
