const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'inventory_tracker'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create database and table if they don't exist
const initializeDatabase = () => {
  const createDBQuery = `CREATE DATABASE IF NOT EXISTS inventory_tracker`;
  const useDBQuery = `USE inventory_tracker`;
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS inventory (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      quantity INT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  connection.query(createDBQuery, (err) => {
    if (err) throw err;
    connection.query(useDBQuery, (err) => {
      if (err) throw err;
      connection.query(createTableQuery, (err) => {
        if (err) throw err;
        console.log('Database and table initialized');
      });
    });
  });
};

initializeDatabase();

module.exports = connection;