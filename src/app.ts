import dotenv from 'dotenv/config';
import { Server } from './models/server.js';

const PORT = process.env.PORT || '3000';
const server = new Server();

server.listen(PORT);