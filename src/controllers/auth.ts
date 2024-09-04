import { Response, Request } from 'express';

import { encrypt } from '../utils/bcrypt.handle.js';
import { handleHttp } from '../utils/error.handle.js';
import { createUser, loginUser } from '../services/user.js';

import { User } from '../interfaces/user';

export const registrarUsuario = async (req: Request<{}, {}, User>, res: Response) => {
    const { activo, rol, ...userData } = req.body;
    const passHash = await encrypt(userData.password);
    userData.password = passHash;
    try {
        const user = await createUser(userData);
        res.status(201).json({
            ok: true,
            msg: 'Usuario creado',
            user
        })
    } catch (e) {
        handleHttp(res, 'Error al registrar usuario', e);
    }
}

export const loginCtrl = async (req: Request, res: Response) => {
    const { correo, password } = req.body;
    try {
        const user = await loginUser(correo, password);
        if (user === 'User not found' || user === 'Password incorrect') {
            return res.status(403).json({
                msg: 'Correo o contraseña incorrectos'
            })
        }
        res.json({
            ok: true,
            ...user
        })
    } catch (e) {
        handleHttp(res, 'Error al logear el usuario', e);
    }
}

