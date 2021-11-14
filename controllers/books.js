const sql = require('../db/connect');
const getBooks = async (req, res) => {
  try {
    if (req.query.hasOwnProperty('search')) {
      const s = `%${req.query.search}%`;
      if (req.query.type == 1) {
        const result =
          await sql.query`SELECT * FROM Book WHERE BookAmount > 0 AND BookTitle LIKE ${s}`;
        res.json({ result: result.recordset });
      } else if (req.query.type == 2) {
        const result =
          await sql.query`SELECT BookTitle, BookAuthor, BookPublisher, BookYear, BookGenre, BorrowDate 
        FROM Book b JOIN BorrowDetail bd ON b.BookID = bd.BookID 
        JOIN Borrow br ON br.BorrowID = bd.BorrowID JOIN Student s ON br.StudentID = s.StudentID
        WHERE ReturnDate IS NULL AND s.StudentID = ${req.query.nim} AND BookTitle LIKE ${s}`;
        res.json({ result: result.recordset });
      } else if (req.query.type == 3) {
        const result =
          await sql.query`SELECT b.BookID, BookTitle, BookAuthor, BookPublisher, BookYear, BookGenre, BorrowDate, s.StudentID, br.BorrowID
        FROM Book b JOIN BorrowDetail bd ON b.BookID = bd.BookID 
        JOIN Borrow br ON br.BorrowID = bd.BorrowID JOIN Student s ON br.StudentID = s.StudentID
        WHERE ReturnDate IS NULL AND s.StudentID LIKE ${s}`;
        res.json({ result: result.recordset });
      }
    } else if (req.query.type == 1) {
      let result;
      if (req.query.hasOwnProperty('showAll')) {
        result = await sql.query`SELECT * FROM Book`;
      } else {
        result = await sql.query`SELECT * FROM Book WHERE BookAmount > 0`;
      }
      res.json({ result: result.recordset });
    } else if (req.query.type == 2) {
      const result =
        await sql.query`SELECT BookTitle, BookAuthor, BookPublisher, BookYear, BookGenre, BorrowDate
        FROM Book b JOIN BorrowDetail bd ON b.BookID = bd.BookID 
        JOIN Borrow br ON br.BorrowID = bd.BorrowID JOIN Student s ON br.StudentID = s.StudentID
        WHERE ReturnDate IS NULL AND s.StudentID = ${req.query.nim}`;
      res.json({ result: result.recordset });
    } else if (req.query.type == 3) {
      const result =
        await sql.query`SELECT b.BookID, BookTitle, BookAuthor, BookPublisher, BookYear, BookGenre, BorrowDate, s.StudentID, br.BorrowID
        FROM Book b JOIN BorrowDetail bd ON b.BookID = bd.BookID 
        JOIN Borrow br ON br.BorrowID = bd.BorrowID JOIN Student s ON br.StudentID = s.StudentID
        WHERE ReturnDate IS NULL`;
      res.json({ result: result.recordset });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = getBooks;
