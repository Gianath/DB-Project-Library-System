const sql = require('mssql/msnodesqlv8');

// const connectDB = () => {
//   return sql.connect(
//     'Driver={SQL Server Native Client 11.0};Server={#{localhost}};Database={#{JP.ID}};Trusted_Connection={#{trusted}};'
//   );
// };

const connectDB = new sql.ConnectionPool({
  database: 'MSLibrary',
  server: 'localhost',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true,
  },
});

module.exports = connectDB;
