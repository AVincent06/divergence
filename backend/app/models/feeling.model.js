/**
* @file Model for the Feelings table according to the Sequelize documentation.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/

/** 
* Feelings table
* @param {any} sequelize
* @param {any} Sequelize
* @return {any} Feeling
*/
module.exports = (sequelize, Sequelize) => {
    const Feeling = sequelize.define("Feeling", {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        }
    });
    return Feeling;
};