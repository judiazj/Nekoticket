import { Types } from 'mongoose';
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

export const asignTicketByUser = async (id: string, localidad: string, cantidad: number, id_user: string) => {
    try {
        const boletasDisponibles = await TicketModel.countDocuments({
            id_evento: new Types.ObjectId(id),
            estado: 'disponible',
            activo: true,
            localidad
        });

        if (cantidad > boletasDisponibles) {
            return 'No hay suficientes boletas disponibles';
        }

        const boletas = await TicketModel.find({
            id_evento: new Types.ObjectId(id),
            localidad,
            estado: 'disponible',
            activo: true
        }).limit(cantidad);

        if (boletas.length <= 0) {
            return 'No hay suficientes boletas disponibles';
        }
        const idsBoletas = boletas.map(boleta => boleta._id);

        const tickets = await TicketModel.updateMany({
            _id: { $in: idsBoletas }
        }, {
            $set: {
                id_usuario: new Types.ObjectId(id_user),
                estado: 'vendido'
            }
        }, { new: true });
        return tickets;
    } catch (error) {
        console.log(error);
    }

}

export const getTicketsPaginatedService = async (idEvento: string) => {
    const ticketsByLocation = await TicketModel.aggregate([
        {
            $match: {
                id_evento: new Types.ObjectId(idEvento), // Filtrar por el ID del evento
                estado: 'disponible', // Filtrar por boletas disponibles
                activo: true // Filtrar por boletas activas
            }
        },
        {
            $group: {
                _id: '$localidad',  // Agrupar por el tipo de boleta (localidad)
                boletas_disponibles: { $sum: 1 },  // Contar cuántas boletas están disponibles por localidad
                info: { $first: '$$ROOT' }  // Obtener una boleta de ejemplo para cada localidad
            }
        },
        {
            $project: {
                _id: 0,
                localidad: '$_id',  // Renombrar el campo _id a localidad
                boletas_disponibles: 1,  // Mantener el conteo de boletas disponibles
                info: {  // Mantener solo los campos necesarios para la boleta de ejemplo
                    _id: 1,
                    localidad: 1,
                    precio: 1,
                    id_evento: 1
                }
            }
        }
    ]);
    return ticketsByLocation;

}