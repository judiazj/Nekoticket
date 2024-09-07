import { Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

import EventModel from '../models/event.js';
import { RequestExtend } from '../interfaces/requestExtend';


export const subirArchivo = async (req: RequestExtend, res: Response) => {
    const { id } = req.params;
    const event = await EventModel.findById(id);

    if (!event) {
        return res.status(400).json({
            msg: 'No existe un usuario con ese id'
        });
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    if (event.imagen) {
        const nombreArr = event.imagen.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    event.imagen = secure_url;
    await event.save();

    res.json(event);
}