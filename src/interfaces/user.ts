import { ObjectId } from 'mongoose';

export interface User {
    id: ObjectId;
    nombre: string;
    correo: string;
    password: string;
    activo?: boolean;
    rol?: rolUser;
    nit?: string;
}

type rolUser = 'artista' | 'cliente' | 'admin';