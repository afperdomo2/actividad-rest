require('dotenv').config();

const config = {
  // Aplicación
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  // Base de datos
  dbDialect: process.env.DB_DIALECT,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  // APIs
  apiKey: process.env.API_KEY,
  // JWT
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = { config };
