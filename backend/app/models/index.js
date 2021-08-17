/**
* @file Initialization, connection and generation of the database.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/
const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

// initialization of the connection to the DB
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Declaration of DB tables via their models
db.users = require("./user.model.js")(sequelize, Sequelize);
db.categories = require("./category.model.js")(sequelize, Sequelize);
db.messages = require("./message.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);
db.feelings = require("./feeling.model.js")(sequelize, Sequelize);

// Declaration of associations (in pairs) for foreign keys
db.messages.hasMany(db.comments);       // #1 association    
db.comments.belongsTo(db.messages);     // #1 association
db.users.hasMany(db.comments);          // #2 association
db.comments.belongsTo(db.users);        // #2 association
db.messages.hasMany(db.feelings);       // #3 association
db.feelings.belongsTo(db.messages);     // #3 association
db.users.hasMany(db.feelings);          // #4 association
db.feelings.belongsTo(db.users);        // #4 association
db.categories.hasMany(db.feelings);     // #5 association
db.feelings.belongsTo(db.categories);   // #5 association
db.users.hasMany(db.messages);          // #6 association
db.messages.belongsTo(db.users);        // #6 association

module.exports = db;