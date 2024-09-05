import { NextFunction, Response } from "express";
import { RequestExtend } from "../interfaces/requestExtend";

export const esAdminRole = (req: RequestExtend, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(500).json({
            ok: false,
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }

    const { rol, nombre } = req.user;

    if (rol !== 'ADMIN') {
        return res.status(401).json({
            ok: false,
            msg: `${nombre} no es administrador - No puede hacer esto`
        })
    }

    next();
}