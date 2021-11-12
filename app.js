const express = require('express');
const app = express();
const loginMember = require('./routes/loginMember');
const getBook = require('./routes/books');
const sql = require('./db/connect');

app.use(express.static('./public'));
app.use(express.json());
app.use('/api/login/member', loginMember);
app.use('/api/books', getBook);

const port = 3000;
const start = async () => {
  try {
    await sql.connect();
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log(error);
  }
};

start();
