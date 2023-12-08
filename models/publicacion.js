const { DataTypes } = require('sequelize');
const db = require('../database/connection');

const Publicacion = db.define('Publicaciones', {
    id: {
        type: DataTypes.STRING,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.STRING
    },
    contenido: {
        type: DataTypes.STRING
    },
    fecha_publicacion: {
        type: DataTypes.STRING
    }
},
    {
        timestamps: false,
    });


module.exports = Publicacion;