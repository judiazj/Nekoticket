import { Router } from 'express';
import { check } from 'express-validator';
import { actualizarEvento, crearEvento, obtenerEventoPorId, obtenerEventos } from '../controllers/event.js';
import {
    validarCampos,
    // validarJWT,
    existeLugarPorId,
    // esArtistaRole,
    // optionalJWT
} from '../middlewares/index.js';
import { getUserById } from '../services/user.js';
const router = Router();

router.get('/', [
    // optionalJWT,
    check('id_usuario', 'El id del usuario debe ser un MongoID').optional().isMongoId(),
    validarCampos
], obtenerEventos);

router.get('/:id', [
    check('id', 'El id debe ser un MongoID').isMongoId(),
    validarCampos
], obtenerEventoPorId);

router.post('/', [
    // validarJWT,
    // esArtistaRole,
    check('id_artista', 'El id del artista es un mongoID').isMongoId(),
    check('id_artista').custom(async (id) => {
        const user = await getUserById(id);
        if (!user || (user.rol as string) !== 'ARTISTA') {
            throw new Error('El id del artista no existe');
        }
    }),
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('id_lugar', 'El id del lugar es un mongoID').isMongoId(),
    existeLugarPorId,
    check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    check('fecha', 'La fecha es obligatoria').isDate(),
    check('hora', 'La hora es obligatoria').not().isEmpty(),
    check('hora_apertura', 'La hora de apertura es obligatoria').not().isEmpty(),
    validarCampos
], crearEvento);

router.put('/:id', [
    check('id', 'El id debe ser un MongoID').isMongoId(),
    validarCampos
], actualizarEvento);

export default router;