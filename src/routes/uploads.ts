import { Router } from 'express';
import { check } from 'express-validator';
import { subirArchivo } from '../controllers/uploads.js';
import { eventExists, validarArchivoSubir, validarCampos } from '../middlewares/index.js';

const router = Router();

router.put('/:id', [
    check('id', 'El id debe ser un MongoID').isMongoId(),
    validarCampos,
    eventExists,
    validarArchivoSubir,
    validarCampos
], subirArchivo)

export default router;