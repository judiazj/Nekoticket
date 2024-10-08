import { User } from '../interfaces/user.js';
import { verified } from '../utils/bcrypt.handle.js';
import UserModel from '../models/user.js';
import { generateToken } from '../utils/token.handle.js';


export const createUser = async (userData: User): Promise<User> => {
    const user = await UserModel.create(userData);
    return user;
}

export const loginUser = async (correo: string, password: string) => {
    const user = await UserModel.findOne({ correo });
    if (!user) return 'User not found';
    const isVerified = await verified(password, user.password);
    if (!isVerified) return 'Password incorrect';

    const token = generateToken(user.correo);
    const { nombre, rol, _id } = user;
    const privateUser = { nombre, correo, rol, _id }
    // const data = { token, privateUser }
    return privateUser;
}

export const getUserById = async (id: string) => {
    const user = await UserModel.findById(id);
    return user;
}