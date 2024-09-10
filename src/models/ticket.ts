import { model, Schema, Types } from 'mongoose';
import { Ticket } from '../interfaces/ticket';

const ticketSchema = new Schema<Ticket>({
    id_evento: {
        type: Types.ObjectId,
        required: [true, 'El id del evento es obligatorio']
    },
    localidad: {
        type: String,
        required: [true, 'La localidad es obligatoria']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    estado: {
        type: String,
        enum: ['disponible', 'vendido'],
        default: 'disponible',
    },
    activo: {
        type: Boolean,
        default: true
    },
    id_usuario: {
        type: Types.ObjectId,
    }
});

const TicketModel = model<Ticket>('Ticket', ticketSchema);

export default TicketModel;