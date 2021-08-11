module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,     // DataTypes.INT
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: {
            type: Sequelize.STRING(100)
        },
        name: {
            type: Sequelize.STRING(100)
        },
        email: {
            type: Sequelize.STRING(100),
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        photo: {
            type: Sequelize.STRING
        },
        bio: {
            type: Sequelize.TEXT
        },
        is_admin: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });
    return User;
};