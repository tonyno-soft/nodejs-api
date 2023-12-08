
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Publicacion = require('../models/publicacion');
const { crearFecha } = require('../helpers/dates');


const getPublicacion = async (req = request, res = response) => {

    const { id } = req.params;
    if (!id) return res.status(404).json({ msg: `El ID es obligatorio.` });

    const usuario = await Publicacion.findByPk(id);

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
}

const getPublicaciones = async (req = request, res = response) => {

   try {
    const publicaciones = await Publicacion.findAll();

    res.json({
        publicaciones
    });
   } catch (error) {
    console.log(error);
    res.status(500).json({
        msg: 'Hable con el administrador'
    })
   }
}

const postPublicacion = async (req, res = response) => {
    
    const token = req.header('x-token');
    const { body } = req;
    const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    try {   
        const fecha_publicacion = crearFecha()

        const publicacion = new Publicacion({ ...body, usuario_id:uid, fecha_publicacion });
        await publicacion.save();

        res.json(publicacion);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getPublicacion,
    getPublicaciones,
    postPublicacion
}