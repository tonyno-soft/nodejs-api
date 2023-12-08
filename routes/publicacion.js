
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos } = require('../middlewares');

const { getPublicacion, getPublicaciones, postPublicacion } = require('../controllers/publicaciones');

const router = Router();


router.get('/', [validarJWT,validarCampos], getPublicaciones);

router.get('/:id', [validarJWT,validarCampos], getPublicacion);

router.post('/', [validarJWT,
    check('contenido', 'El contenido es obligatorio').not().isEmpty(),
    validarCampos], postPublicacion);


module.exports = router;