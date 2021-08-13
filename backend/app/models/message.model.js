/**
* @file Model for the Messages table according to the Sequelize documentation.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/

/** 
* Messages table
* @param {any} sequelize
* @param {any} Sequelize
* @return {any} Message
*/
module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("Message", {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        picture: {
            type: Sequelize.STRING
        },
        article: {
            type: Sequelize.TEXT
        }
    });
    return Message;
};