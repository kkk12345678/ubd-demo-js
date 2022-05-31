const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING},
    refreshToken: {type: DataTypes.STRING}
})

module.exports = {
    User
}