const { Sequelize } = require('sequelize');

require('dotenv').config();

// Setup configs
const sequelizeConn = new Sequelize(process.env.DATABASE_URL);

// Test connection with the DB
// async function testConnection() {
//     try {
//         await sequelizeConn.authenticate();
//         console.log("Connection has been established successfully.");
//     } catch (error) {
//         console.log(`Unable to connect to the db: ${error}`)
//     }
// }

function testConnection() {
    sequelizeConn.authenticate().then(() => {
        console.log("Connection has been established successfully.");
    }).catch((error) => {
        console.log(`Unable to connect to the db: ${error}`)
    })
}

module.exports = { sequelizeConn, testConnection };