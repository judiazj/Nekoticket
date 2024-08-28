import bcrypt from 'bcryptjs';
const { compare, hash } = bcrypt;

export const encrypt = async (password: string): Promise<string> => {
    const passwordHash = await hash(password, 10);
    return passwordHash;
}

export const verified = async (password: string, passHash: string): Promise<boolean> => {
    const isCorrect = await compare(password, passHash);
    return isCorrect
}
