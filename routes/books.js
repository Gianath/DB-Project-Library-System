const express = require('express');
const router = express.Router();
const { getBooks, deleteBook } = require('../controllers/books');

router.route('/').get(getBooks);
router.route('/:id').delete(deleteBook);

module.exports = router;
