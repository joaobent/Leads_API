import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',  
  database: 'your-database', 
});

export default pool;
