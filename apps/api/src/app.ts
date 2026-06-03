import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { contactRoutes } from '~/modules/contact';
import { contactFormRoutes } from '~/modules/contactForm';
import { newsletterRoutes } from '~/modules/newsletter';

function initializeApp(): Application {

    const app = express();

    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());

    app.set("trust proxy", true);
    app.set("trust proxy", "loopback");

    app.use("/contacts", contactRoutes);
    app.use("/contact-form", contactFormRoutes);
    app.use("/newsletter", newsletterRoutes);

    return app;
};

export default initializeApp;