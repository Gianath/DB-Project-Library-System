const sql = require('../db/connect');
const getBooks = async (req, res) => {
  try {
    if (req.query.hasOwnProperty('search')) {
      const s = `%${req.query.search}%`;
      if (req.query.type == 1) {
        const result =
          await sql.query`SELECT * FROM Book WHERE BookAmount > 0 AND BookTitle LIKE ${s}`;
        result.recordset = result.recordset.map((data) => {
          if (data.BookYear) {
            data.BookYear = data.BookYear.getFullYear();
          }
          return data;
        });
        res.json({ result: result.recordset });
      } else if (req.query.type == 2) {
        const result =
          await sql.query`SELECT BookTitle, BookAuthor, BookPublisher, BookYear, BookGenre, BorrowDate 
        FROM Book b JOIN BorrowDetail bd ON b.BookID = bd.BookID 
        JOIN Borrow br ON br.BorrowID = bd.BorrowID JOIN Student s ON br.StudentID = s.StudentID
        WHERE ReturnDate IS NULL AND s.StudentID = ${req.query.nim} AND BookTitle LIKE ${s}`;
        result.recordset = result.recordset.map((data) => {
          if (data.BookYear) {
            data.BookYear = data.BookYear.getFullYear();
          }
          return data;
        });
        res.json({ result: result.recordset });
      } else if (req.query.type == 3) {
        const result =
          await sql.query`SELECT b.BookID, BookTitle, BookAuthor, BookPublisher, BookYear, BookGenre, BorrowDate, s.StudentID, br.BorrowID
        FROM Book b JOIN BorrowDetail bd ON b.BookID = bd.BookID 
        JOIN Borrow br ON br.BorrowID = bd.BorrowID JOIN Student s ON br.StudentID = s.StudentID
        WHERE ReturnDate IS NULL AND s.StudentID LIKE ${s}`;
        result.recordset = result.recordset.map((data) => {
          if (data.BookYear) {
            data.BookYear = data.BookYear.getFullYear();
          }
          return data;
        });
        res.json({ result: result.recordset });
      }
    } else if (req.query.type == 1) {
      let result;
      if (req.query.hasOwnProperty('showAll')) {
        result = await sql.query`SELECT * FROM Book`;
      } else {
        result = await sql.query`SELECT * FROM Book WHERE BookAmount > 0`;
      }
      result.recordset = result.recordset.map((data) => {
        if (data.BookYear) {
          data.BookYear = data.BookYear.getFullYear();
        }
        return data;
      });
      res.json({ result: result.recordset });
    } else if (req.query.type == 2) {
      const result =
        await sql.query`SELECT BookTitle, BookAuthor, BookPublisher, BookYear, BookGenre, BorrowDate
        FROM Book b JOIN BorrowDetail bd ON b.BookID = bd.BookID 
        JOIN Borrow br ON br.BorrowID = bd.BorrowID JOIN Student s ON br.StudentID = s.StudentID
        WHERE ReturnDate IS NULL AND s.StudentID = ${req.query.nim}`;
      result.recordset = result.recordset.map((data) => {
        if (data.BookYear) {
          data.BookYear = data.BookYear.getFullYear();
        }
        return data;
      });
      res.json({ result: result.recordset });
    } else if (req.query.type == 3) {
      const result =
        await sql.query`SELECT b.BookID, BookTitle, BookAuthor, BookPublisher, BookYear, BookGenre, BorrowDate, s.StudentID, br.BorrowID
        FROM Book b JOIN BorrowDetail bd ON b.BookID = bd.BookID 
        JOIN Borrow br ON br.BorrowID = bd.BorrowID JOIN Student s ON br.StudentID = s.StudentID
        WHERE ReturnDate IS NULL`;
      result.recordset = result.recordset.map((data) => {
        if (data.BookYear) {
          data.BookYear = data.BookYear.getFullYear();
        }
        return data;
      });
      res.json({ result: result.recordset });
    }
  } catch (error) {
    console.log(error);
  }
};

const getSingleBook = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await sql.query`SELECT * FROM Book
          WHERE BookID = ${id}`;
    result.recordset = result.recordset.map((data) => {
      if (data.BookYear) {
        data.BookYear = data.BookYear.getFullYear();
      }
      return data;
    });
    res.json({ result: result.recordset });
  } catch (error) {
    console.log(error);
  }
};

const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await sql.query`DELETE FROM Book
          WHERE BookID = ${id}`;
    res.json({ result: result.rowsAffected });
  } catch (error) {
    console.log(error);
  }
};

const addBook = async (req, res) => {
  try {
    let id = 'BN' + Date.now().toString().substr(0, 11);
    const data = req.body;
    const result = await sql.query`INSERT INTO Book VALUES(${id}, ${
      data.title
    }, ${data.author ? data.author : null}, ${
      data.publisher ? data.publisher : null
    }, ${data.year ? data.year.padStart(4, '0') : null}, ${
      data.genre ? data.genre : null
    }, ${data.amount})`;
    res.json({ result: result.rowsAffected });
  } catch (error) {
    console.log(error);
  }
};

const updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await sql.query`UPDATE Book
    SET 
    BookTitle = ${data.title},
    BookAuthor = ${data.author ? data.author : null},
    BookPublisher = ${data.publisher ? data.publisher : null},
    BookYear = ${data.year ? data.year.padStart(4, '0') : null},
    BookGenre = ${data.genre ? data.genre : null},
    BookAmount = ${data.amount}
    WHERE
    BookID = ${id}`;
    res.json({ result: result.rowsAffected });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getBooks,
  deleteBook,
  addBook,
  getSingleBook,
  updateBook,
};
