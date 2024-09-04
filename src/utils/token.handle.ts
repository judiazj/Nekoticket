import jwt from 'jsonwebtoken';

const { sign, verify } = jwt;

const JWT_SECRET = process.env.JWT_SECRET || 'verifiyoursignaturein.envfile';

export const generateToken = (id: string) => {
    const jwt = sign({ id }, JWT_SECRET, { expiresIn: '24h' });
    return jwt;
}

export const verifyToken = (jwt: string) => {
    const payload = verify(jwt, JWT_SECRET);
    return payload
}