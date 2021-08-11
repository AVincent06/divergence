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