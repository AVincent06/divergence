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