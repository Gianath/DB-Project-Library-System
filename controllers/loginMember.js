const sql = require('../db/connect');
var current = null;
const getCurrMember = async (req, res) => {
  res.json({ current });
};
const getMember = async (req, res) => {
  try {
    const data = req.body;
    const result =
      await sql.query`SELECT * FROM Student WHERE StudentEmail = ${data.email} AND StudentPWD = ${data.pass}`;
    if (result.recordset.length > 0) {
      current = result.recordset;
      res.json({ result: result.recordset });
    } else {
      res.json({ msg: 'wrong email/pass' });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getMember,
  getCurrMember,
};
