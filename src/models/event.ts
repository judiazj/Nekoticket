import { model, Schema } from 'mongoose';
import { Event } from '../interfaces/event';

const eventSchema = new Schema<Event>(
    {
        codigo: { type: Number, required: true },
        nombre: { type: String, required: true },
        descripcion: { type: String, required: true },
        id_artista: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        activo: { type: Boolean, default: true },
        categoria: { type: String, required: true },
        id_lugar: { type: Schema.Types.ObjectId, ref: 'Place', required: true },
        imagen: { type: String, required: false },
        fecha: { type: Date, required: true },
        hora: { type: String, required: true },
        hora_apertura: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const EventModel = model<Event>('Event', eventSchema);
export default EventModel;