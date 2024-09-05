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
            required: true,
            unique: true
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
            enum: ['ARTISTA', 'CLIENTE', 'ADMIN'],
            default: 'CLIENTE'
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