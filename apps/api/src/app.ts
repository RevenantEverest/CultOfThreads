import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { contactFormRoutes } from '~/modules/contactForm';

import { permissions, auth } from '~/middleware';

function initializeApp(): Application {

    const app = express();

    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());

    app.set("trust proxy", true);
    app.set("trust proxy", "loopback");

    app.use("/contact-form", contactFormRoutes);

    return app;
};

export default initializeApp;