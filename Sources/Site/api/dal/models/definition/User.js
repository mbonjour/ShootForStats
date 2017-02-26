'use strict';
module.exports = function (sequelize, SeqInit) {
    let User = sequelize.define('User', {
        idUser: {
            type: SeqInit.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: SeqInit.STRING(45),
            allowNull: true
        },
        lastname: {
            type: SeqInit.STRING(45),
            allowNull: true
        },
        email: {
            type: SeqInit.STRING(45),
            allowNull: false
        },
        isAdmin: {
            type: SeqInit.BOOLEAN,
            allowNull: false
        },
        hashPass: {
            type: SeqInit.STRING(75),
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                User.belongsToMany(models.User, {
                    as: 'user',
                    through: 'has_Group',
                    foreignKey: 'idUser',
                    otherKey: 'fkUser'
                })
                User.belongsToMany(models.User, {
                    as: 'coach',
                    through: 'has_Coach',
                    foreignKey: 'idUser',
                    otherKey: 'fkUser'
                })
                User.hasMany(models.Shoot, {
                    foreignKey: 'fkUser'
                })
            }
        }
    })
    return User
}