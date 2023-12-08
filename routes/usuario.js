
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the user
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         apellido:
 *           type: string
 *           description: El nombre del usuario
 *         email:
 *           type: string
 *           description: Correo del usuario
 *         estado:
 *           type: boolean
 *           description: Si el usuario esta activo o fue borrado 
 *       example:
 *         id: 1
 *         nombre: Jose
 *         apellido: Perez
 *         email: jose.perez@ talentca.com.mx
 *         estado: true 
 */
const { Router } = require('express');
const { check } = require('express-validator');

const {validarJWT, validarCampos} = require('../middlewares/');


//const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { getUsuario,
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario } = require('../controllers/usuarios');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: The Usuarios managing API
 * /api/usuarios:
 *   get:
 *     summary: Lista de todos los usuarios.
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Usuario'
 *   post:
 *     summary: Crear un usuario.
 *     tags: [Usuarios]
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
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The usuario id
 *     responses:
 *       200:
 *         description: The usuario response by id
 *         contens:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: The usuario was not found
 *   put:
 *    summary: Actualizar usuario por ID
 *    tags: [Usuarios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The usuario id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *                $ref: '#/components/schemas/Usuario'
 *    responses:
 *      200:
 *        description: The usuario was updated
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Usuario'
 *      404:
 *        description: The usuario was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Borrar usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The usuario id
 *
 *     responses:
 *       200:
 *         description: The usuario was deleted
 *       404:
 *         description: The usuario was not found
 */

router.get('/',[validarJWT], getUsuarios);
router.get('/:id',[validarJWT], getUsuario);
router.post('/',[validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('apellido','El apellido es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty().isEmail(),
    check('contra','El contra es obligatorio').not().isEmpty(),
    validarCampos], postUsuario);
router.put('/:id',[validarJWT,validarCampos], putUsuario);
router.delete('/:id',[validarJWT], deleteUsuario);


module.exports = router;