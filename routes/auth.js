
/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - correo
 *         - email
 *       properties: 
 *         email:
 *           type: string
 *           description: Correo del usuario
 *         contra:
 *           type: string
 *           description: Contraseña creada
 *       example:
 *         email: jose.perez@ talenteca.com.mx
 *         contra: joseperez321
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { login, register } = require('../controllers/auth');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: The Usuarios managing API
 * /api/register: 
 *   post:
 *     summary: Registrar un usuario.
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *                $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: El usuario creado.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Some server error
 * /api/login: 
 *   post:
 *     summary: Iniciar sesion
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *                $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Sesion creada correctamente, X-TOKEN en body.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Login'
 *       500:
 *         description: Some server error
 */


router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('contra', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

router.post('/register',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('contra', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], register );

module.exports = router;