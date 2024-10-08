import express, { Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';


import routes from '../routes/index.js';
import dbConnection from '../config/mongo.js';


export class Server {
    private app: Application;

    constructor() {
        this.app = express();
        this.connectDatabase();
        this.middlewares();
        this.routes();
    }


    connectDatabase() {
        dbConnection().then(() => {
            console.log('Connected to MongoDB');
        })
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        this.app.use('/api', routes);
    }

    listen(port: string) {
        this.app.listen(port, () => {
            console.log(`Server on port: ${port}`);
        })
    }
}