const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarJWT");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/event");
const { isDate } = require("../helpers/isDate");

/*

Rutas de Evento / Event
host + /api/event

*/

/*
[
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
    ]
*/


const router = Router();

    router.use(validarJWT);

router.get('/', validarJWT
    , getEventos);

router.post('/', [
    check('title', 'El titulo es obligatorio.').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalización es obligatoria').custom(isDate),
    validarCampos
    ]
    
    , crearEvento);
router.put('/:id',[
    check('title', 'El titulo es obligatorio.').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalización es obligatoria').custom(isDate),
    validarCampos
    ]
    , actualizarEvento);

    router.delete('/:id', validarJWT
    , eliminarEvento);



module.exports = router;