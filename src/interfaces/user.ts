import { ObjectId } from 'mongoose';

export interface User {
    _id: ObjectId;
    nombre: string;
    correo: string;
    password: string;
    activo?: boolean;
    rol?: rolUser;
    nit?: string;
}

type rolUser = 'ARTISTA' | 'CLIENTE' | 'ADMIN';