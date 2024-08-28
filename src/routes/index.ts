import { Router } from 'express';
import { readdirSync } from 'fs';
import path from 'path';

const router = Router();

const __dirname = path.resolve();

const cleanName = (filename: string) => {
    return filename.split('.').shift();
}

readdirSync(`${__dirname}/src/routes`).forEach((file) => {
    const cleanFile = cleanName(file);
    if (cleanFile !== 'index') {
        import(`./${cleanFile}.js`).then((module) => {
            router.use(`/${cleanFile}`, module.default);
        });
    }
})


export default router;