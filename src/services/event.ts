import EventModel from '../models/event.js';
import { Event } from '../interfaces/event';

export const createEvent = async (eventData: Event): Promise<Event> => {
    const event = await EventModel.create(eventData);
    return event;
}

export const getEvents = async (): Promise<Event[]> => {
    const events = await EventModel.find().populate('id_artista').populate('id_lugar');
    return events;
}

export const updateEvent = async (id: string, data: Event): Promise<Event | string> => {
    const event = await EventModel.findByIdAndUpdate(id, data, { new: true });
    if (!event) return 'Evento no encontrado';
    return event;
}