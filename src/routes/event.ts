import { Router } from 'express';
import { check } from 'express-validator';
import { crearEvento } from '../controllers/event.js';
import { validarCampos } from '../middlewares/validarCampos.js';

const router = Router();

router.get('/',);

router.post('/', [
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('id_artista', 'El id del artista es un mongoID').isMongoId(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('lugar', 'El lugar es un mongoID').isMongoId(),
    check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    check('fecha', 'La fecha es obligatoria').isDate(),
    check('hora', 'La hora es obligatoria').not().isEmpty(),
    check('hora_apertura', 'La hora de apertura es obligatoria').not().isEmpty(),
    validarCampos
], crearEvento);

router.put('/:id',);

export default router;