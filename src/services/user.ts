import { User } from '../interfaces/user.js';
import UserModel from '../models/user.js';


export const crearUser = async (userData: User): Promise<User> => {
    const user = await UserModel.create(userData);
    return user;
}