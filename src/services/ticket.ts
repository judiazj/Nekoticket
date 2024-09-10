import TicketModel from '../models/ticket.js';

export const createTicketsService = async (eventId: string, localidad: string, precio: number, cantidad: number) => {
    const tickets = [];
    for (let i = 0; i < cantidad; i++) {
        tickets.push({
            id_evento: eventId,
            localidad,
            precio,
        });
    }

    await TicketModel.insertMany(tickets);
    return `Se crearon ${cantidad} tickets en la localidad ${localidad} para el evento ${eventId}`;
}

export const getTicketById = async (id: string) => {
    return TicketModel.findOne({ _id: id, activo: true, estado: 'disponible' });
}

export const asignTicketByUser = async (id: string, userId: string) => {
    return TicketModel.findOneAndUpdate({ _id: id }, { id_usuario: userId, estado: 'vendido' }, { new: true });
}