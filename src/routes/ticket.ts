import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/index.js';
import { asignTickets, createTickets, getTicketsByLocalidad, getTicketsByUser } from '../controllers/ticket.js';
import { getEventById } from '../services/event.js';
import { getUserById } from '../services/user.js';
import { verifyTicketEventByUser } from '../middlewares/validarCampos.js';

const router = Router();


router.get('/:idEvento', [
    check('idEvento', 'El id del evento es un MongoID').isMongoId(),
    check('idEvento').custom(async (id) => {
        const event = await getEventById(id);
        if (!event) {
            throw new Error('El evento no existe');
        }
    }),
    validarCampos,
], getTicketsByLocalidad);

router.get('/user/:idUsuario', [
    check('idUsuario', 'El id del usuario es un MongoID').isMongoId(),
    check('idUsuario').custom(async (id) => {
        const user = await getUserById(id);
        if (!user) {
            throw new Error('El usuario no existe');
        }
    }),
    validarCampos,
], getTicketsByUser);

// TODO: Implementar la autenticacion
router.post('/create', [
    check('id_evento', 'El id del evento es un MongoID').isMongoId(),
    check('id_evento').custom(async (id) => {
        const event = await getEventById(id);
        if (!event) {
            throw new Error('El evento no existe');
        }
    }),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('localidad', 'La localidad es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').isNumeric({ no_symbols: true }),
    check('cantidad', 'La cantidad es obligatoria').isNumeric({ no_symbols: true }),
    validarCampos,
], createTickets);

router.put('/obtain/:id', [
    check('id', 'El id del evento es un MongoID').isMongoId(),
    check('id').custom(async (id) => {
        const event = await getEventById(id);
        if (!event) {
            throw new Error('El evento no existe');
        }
    }),
    check('id_usuario', 'El id del usuario es un MongoID').isMongoId(),
    check('id_usuario').custom(async (id) => {
        const user = await getUserById(id);
        if (!user) {
            throw new Error('El usuario no existe');
        }
    }),
    verifyTicketEventByUser,
    check('localidad', 'La localidad es obligatoria').not().isEmpty(),
    // TODO: Implementar middleware verificar localidades
    check('cantidad', 'La cantidad es obligatoria').isNumeric({ no_symbols: true }),
    validarCampos,
], asignTickets);

export default router;