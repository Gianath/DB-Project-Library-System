const { query } = require('express');
const sql = require('../db/connect');
const getBooks = async (req, res) => {
  try {
    if (req.query.type == 1) {
      const result = await sql.query`SELECT * FROM Book WHERE BookAmount > 0`;
      res.json({ result: result.recordset });
    } else if (req.query.type == 2) {
      const result =
        await sql.query`SELECT BookTitle, BookAuthor,BookPublisher,BookYear,BookGenre 
      FROM Book b JOIN BorrowDetail bd ON b.BookID = bd.BookID 
      JOIN Borrow br ON br.BorrowID = bd.BorrowID JOIN Student s ON br.StudentID = s.StudentID
      WHERE ReturnDate IS NULL AND s.StudentID = ${req.query.StudentID}`;
      res.json({ result: result.recordset });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = getBooks;
