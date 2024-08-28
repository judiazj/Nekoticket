import { Router } from 'express';
import { check } from 'express-validator';

import { registrarUsuario } from '../controllers/auth.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { existeEmail } from '../middlewares/validarUsers.js';

const router = Router();

router.post('/registro', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    existeEmail,
    check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
], registrarUsuario);

export default router;