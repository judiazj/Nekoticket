import EventModel from '../models/event.js';
import { Event } from '../interfaces/event';
import { User } from '../interfaces/user';
import { Types } from 'mongoose';

export const createEvent = async (eventData: Event): Promise<Event> => {
    const event = await EventModel.create(eventData);
    return event;
}

export const getEvents = async (user: User): Promise<Event[]> => {
    if (!user) {
        return await EventModel.find({ activo: true }).populate('id_artista').populate('id_lugar').lean();
    }
    if (user.rol === 'ADMIN') {
        return await EventModel.find().populate('id_artista').populate('id_lugar').lean();
    } else if (user.rol === 'ARTISTA') {
        return await EventModel.find({ id_artista: user._id }).populate('id_artista').populate('id_lugar').lean();
    }
    return await EventModel.find({ activo: true }).populate('id_artista').populate('id_lugar').lean();
}

export const updateEvent = async (id: string, data: Event): Promise<Event | string> => {
    const event = await EventModel.findByIdAndUpdate(id, data, { new: true });
    if (!event) return 'Evento no encontrado';
    return event;
}

export const getEventById = async (id: string): Promise<Event | null> => {
    const event = await EventModel.findById(id).populate('id_artista').populate('id_lugar');
    return event;
}

export const getTicketsSoldByEvent = async (id: string) => {
    const event = await EventModel.aggregate([
        {
            $match: {
                _id: new Types.ObjectId(id),
                activo: true
            }
        },
        {
            $lookup: {
                from: 'tickets',
                localField: '_id',
                foreignField: 'id_evento',
                as: 'tickets'
            }
        },
        {
            $unwind: '$tickets'
        },
        {
            $group: {
                _id: '$_id',
                total_tickets: {
                    $sum: {
                        $cond: [{ $eq: ['$tickets.estado', 'vendido'] }, 1, 0]
                    }
                }
            }
        }
    ]);
    return event;
}