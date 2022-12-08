/*
    Rutas de Eventos
    host + /api/events

*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events")
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Todos tienen que pasas por la validacion del JWT
//Las que esten debajo de esta linea tendra esta validacion
router.use( validarJWT );

//Obtener Eventos
router.get('/',
    getEventos);

//Crear un nuevo Evento
router.post('/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento);

//Actualizar Evento
router.put('/:id',
    actualizarEvento);

//Borrar Evento
router.delete('/:id',
    eliminarEvento);

module.exports = router;