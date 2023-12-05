const { config } = require('../config/config');

const { dbDialect: DIALECT, dbHost: HOST, dbPort: PORT, dbName: NAME } = config;
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `${DIALECT}://${USER}:${PASSWORD}@${HOST}:${PORT}/${NAME}`;

module.exports = {
  development: {
    url: URI,
    dialect: DIALECT,
  },
  production: {
    url: URI,
    dialect: DIALECT,
  },
};
