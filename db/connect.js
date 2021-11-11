const sql = require('mssql/msnodesqlv8');

const connectDB = new sql.ConnectionPool({
  database: 'MSLibrary',
  server: 'localhost',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true,
  },
});

module.exports = connectDB;
