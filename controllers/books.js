const sql = require('../db/connect');
const getBooks = async (req, res) => {
  if (req.params.id == 1) {
    const result = await sql.query`SELECT * FROM Book WHERE BookAmount > 0`;
    res.json({ result: result.recordset });
  } else if (req.params.id == 2) {
    const result =
      await sql.query`SELECT BookTitle, BookAuthor,BookPublisher,BookYear,BookGenre 
    FROM Book b JOIN BorrowDetail bd ON b.BookID = bd.BookID 
    JOIN Borrow br ON br.BorrowID = bd.BorrowID JOIN Student s ON br.StudentID = s.StudentID
    WHERE ReturnDate IS NULL`;
    res.json({ result: result.recordset });
  }
};

module.exports = getBooks;
