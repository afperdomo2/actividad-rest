const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models/index');

const { dbDialect: DIALECT, dbHost: HOST, dbPort: PORT, dbName: NAME } = config;
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `${DIALECT}://${USER}:${PASSWORD}@${HOST}:${PORT}/${NAME}`;

const sequelize = new Sequelize(URI, { dialect: DIALECT, logging: true });

setupModels(sequelize);
sequelize.sync();

module.exports = sequelize;
