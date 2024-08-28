import { model, Schema } from 'mongoose';
import { Place } from '../interfaces/place';

const placeSchema = new Schema<Place>(
    {
        ciudad: { type: String, required: true },
        direccion: { type: String, required: true },
        nombre: { type: String, required: true },
        departamento: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const PlaceModel = model<Place>('Place', placeSchema);
export default PlaceModel;