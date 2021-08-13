/**
* @file Model for the Categories table according to the Sequelize documentation.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/

/** 
* Categories table
* @param {any} sequelize
* @param {any} Sequelize
* @return {any} Category
*/
module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("Category", {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(7),
            allowNull: false,
            unique: true
        }
    });
    return Category;
};