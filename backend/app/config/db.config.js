require('dotenv').config();

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: "mysql",
    pool: {
        max:5,  // maximum number of connection in pool
        min: 0, // minimum number of connection in pool
        acquire: 30000, // max ms time before throwing error
        idle: 10000 // max ms time before being released
    }
};