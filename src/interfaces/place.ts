import { ObjectId } from "mongoose";

export interface Place {
    id: ObjectId;
    ciudad: string;
    direccion: string;
    nombre: string;
    departamento: string;
}