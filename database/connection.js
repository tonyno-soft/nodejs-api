const { Sequelize } = require('sequelize');


const db = new Sequelize('multiplica', 'toor', '1111', {
    host: 'localhost',
    dialect: 'mysql',
    port:33060,
    logging: true,
});

module.exports = db;
