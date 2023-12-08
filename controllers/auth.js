const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');


const login = async (req, res = response) => {

    const { email, contra } = req.body;

    try {

        // Verificar si el email existe
        let usuario = await Usuario.findOne({
            where: {
                email
            }
        });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos.'
            });
        }

        // SI el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario Inactivo'
            });
        }


        // Verificar la contraseña
        /* const validPassword = bcryptjs.compareSync( contra, usuario.contra );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        } */

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

const register = async (req, res = response) => {

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

module.exports = {
    login,
    register
}
