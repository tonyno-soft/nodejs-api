const { DataTypes } = require('sequelize');
const db = require('../database/connection');

const Usuario = db.define('Usuario', {
    id: {
        type: DataTypes.STRING,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    contra: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
},
    {
        timestamps: false,
        defaultScope: {
            attributes: {
                exclude: ['contra']
            }
        },
        hooks: {
            afterCreate: (record) => {
                delete record.dataValues.contra;
            },
            afterUpdate: (record) => {
                delete record.dataValues.contra;
            },
        }
    });


module.exports = Usuario;