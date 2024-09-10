import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/index.js';
import { asignTickets, createTickets } from '../controllers/ticket.js';
import { getEventById } from '../services/event.js';
import { getUserById } from '../services/user.js';
import { getTicketById } from '../services/ticket.js';

const router = Router();


// TODO: Implementar la autenticacion
router.post('/create', [
    check('id_evento', 'El id del evento es un MongoID').isMongoId(),
    check('id_evento').custom(async (id) => {
        const event = await getEventById(id);
        if (!event) {
            throw new Error('El evento no existe');
        }
    }),
    check('localidad', 'La localidad es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').isNumeric({ no_symbols: true }),
    check('cantidad', 'La cantidad es obligatoria').isNumeric({ no_symbols: true }),
    validarCampos,
], createTickets);

router.put('/obtain/:id', [
    check('id', 'El id del ticket es un MongoID').isMongoId(),
    check('id').custom(async (id) => {
        const ticket = await getTicketById(id);
        if (!ticket) {
            throw new Error('El ticket no existe');
        }
    }),
    check('id_usuario', 'El id del usuario es un MongoID').isMongoId(),
    check('id_usuario').custom(async (id) => {
        const user = await getUserById(id);
        if (!user) {
            throw new Error('El usuario no existe');
        }
    }),
    validarCampos,
], asignTickets);

export default router;