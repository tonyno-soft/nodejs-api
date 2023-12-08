const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

const getUsuario = async (req = request, res = response) => {

    const { id } = req.params;
    if (!id) return res.status(404).json({ msg: `El ID es obligatorio.` });

    const usuario = await Usuario.findByPk(id);

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
}

const getUsuarios = async (req = request, res = response) => {

    try {
        const usuarios = await Usuario.findAll({ where: { estado: 1 } });
        res.json({
            usuarios
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

const postUsuario = async (req, res = response) => {

    const { body } = req;

    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email: ' + body.email
            });
        }

        const usuario = new Usuario({ ...body, estado: true });
        await usuario.save();

        res.json(usuario);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

const putUsuario = async (req, res = response) => {

    const { id } = req.params;
    const { body } = req;
    if (!id) return res.status(404).json({ msg: `El ID es obligatorio.` });

    try {

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

        await usuario.update(body);

        res.json(usuario);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

const deleteUsuario = async (req, res = response) => {

    const { id } = req.params;
    if (!id) return res.status(404).json({ msg: `El ID es obligatorio.` });

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }

    // soft delete
    await usuario.update({ estado: false });
    // BORRAR COMPLETAMENTE UN USUARIO DE LA BASE DE DATOS
    // await usuario.destroy();
    res.json({ "message": "El usuario fue borrado." });
}

module.exports = {
    getUsuario,
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}