import { NextFunction, Response } from "express";
import { RequestExtend } from "../interfaces/requestExtend";


export const validarArchivoSubir = (req: RequestExtend, res: Response, next: NextFunction) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivos para subir'
        });
    }

    next();
}