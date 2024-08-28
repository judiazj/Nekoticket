import { model, Schema } from 'mongoose';
import { User } from '../interfaces/user';

const userSchema = new Schema<User>(
    {
        nombre: {
            type: String,
            required: true
        },
        correo: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        activo: {
            type: Boolean,
            default: true
        },
        rol: {
            type: String,
            enum: ['artista', 'cliente', 'admin'],
            default: 'cliente'
        },
        nit: {
            type: String
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);

const UserModel = model<User>('User', userSchema);
export default UserModel;