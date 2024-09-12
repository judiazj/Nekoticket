import { ObjectId } from "mongoose";

export interface Ticket {
    _id: ObjectId;
    nombre: string;
    descripcion: string;
    id_evento: ObjectId;
    localidad: string;
    precio: number;
    estado: EstadoBoleta;
    activo: boolean;
    id_usuario?: ObjectId;
}

type EstadoBoleta = 'disponible' | 'vendido'; 