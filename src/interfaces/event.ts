import { ObjectId } from "mongoose";

export interface Event {
    id: ObjectId;
    codigo: number;
    nombre: string;
    descripcion: string;
    id_artista: ObjectId;
    activo: boolean;
    categoria: string;
    id_lugar: ObjectId;
    imagen: string;
    fecha: Date;
    hora: string;
    hora_apertura: string;
}

