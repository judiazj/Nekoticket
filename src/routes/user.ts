import { Router } from 'express';
import { check } from 'express-validator';

import { getUserId } from '../controllers/user.js';
import { validarCampos } from '../middlewares/index.js';
import { getUserById } from '../services/user.js';

const router = Router();

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(async (id) => {
        const user = getUserById(id);
        if (!user) {
            throw new Error(`El usuario con id ${id} no existe`);
        }
    }),
    validarCampos
], getUserId);

export default router;