import EventModel from '../models/event.js';
import { Event } from '../interfaces/event';

export const createEvent = async (eventData: Event): Promise<Event> => {
    const event = await EventModel.create(eventData);
    return event;
}