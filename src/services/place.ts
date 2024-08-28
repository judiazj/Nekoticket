import PlaceModel from '../models/place.js';
import { Place } from '../interfaces/place';

export const createPlace = async (placeData: Place): Promise<Place> => {
    const place = await PlaceModel.create(placeData);
    return place;
}

export const updatePlace = async (id: string, placeData: Place): Promise<Place | null> => {
    const place = await PlaceModel.findByIdAndUpdate(id, placeData, { new: true });
    return place;
}