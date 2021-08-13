/**
* @file Model for the Comments table according to the Sequelize documentation.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/

/** 
* Comments table
* @param {any} sequelize
* @param {any} Sequelize
* @return {any} Comment
*/
module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("Comment", {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        feedback: {
            type: Sequelize.TEXT('tiny'),
            allowNull: false
        }
    });
    return Comment;
};