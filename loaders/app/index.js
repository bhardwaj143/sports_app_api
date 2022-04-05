import express from 'express';
import { createServer } from 'http';
import { privateKey } from '../../config/privateKeys.js';
import morgan from 'morgan';
import cors from 'cors';

const PORT = Number(privateKey.PORT) || 3000;

const appLoader = async (app, router) => new Promise(resolve => {
    const server = createServer(app);
    app.use(express.json());
    app.use('/uploads/', express.static('uploads/'));
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'));
    app.use(cors());
    app.use('/v1/', router);
    server.listen(PORT, () => {
        console.log(`App is running on port: ${PORT}`);
    });
    resolve();
});

export { appLoader };
