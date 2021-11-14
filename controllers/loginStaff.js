const sql = require('../db/connect');
var current = null;
const getCurrStaff = async (req, res) => {
  res.json({ current });
};

const getMember = async (req, res) => {
  try {
    const data = req.body;
    const result =
      await sql.query`SELECT * FROM Librarian WHERE LibName = ${data.username} AND LibPWD = ${data.pass}`;
    if (result.recordset.length > 0) {
      current = result.recordset;
      res.json({ result: result.recordset });
    } else {
      res.json({ msg: 'wrong username/pass' });
    }
  } catch (error) {
    console.log(error);
  }
};
const logout = async (req, res) => {
  current = null;
  res.json({ msg: 'You have logged out' });
};
module.exports = {
  getCurrStaff,
  getMember,
  logout,
};
