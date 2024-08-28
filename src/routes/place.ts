import { Router } from 'express';
import { check } from 'express-validator';
import { actualizarLugar, crearLugar } from '../controllers/place.js';
import { validarCampos } from '../middlewares/validarCampos.js';

const router = Router();

router.post('/', [
    check('ciudad', 'La ciudad es obligatoria').not().isEmpty(),
    check('direccion', 'La dirección es obligatoria').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('departamento', 'El departamento es obligatorio').not().isEmpty(),
    validarCampos
], crearLugar);

router.put('/:id', [
    check('id', 'El id es un MongoId').isMongoId(),
    validarCampos
], actualizarLugar);

export default router;