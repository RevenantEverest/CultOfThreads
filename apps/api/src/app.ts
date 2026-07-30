import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { categoryRoutes } from '~/modules/category';
import { contactRoutes } from '~/modules/contact';
import { contactFormRoutes } from '~/modules/contactForm';
import { eventRoutes } from '~/modules/event';
import { marketRoutes } from './modules/market';
import { newsletterRoutes } from '~/modules/newsletter';
import { productRoutes } from '~/modules/products';
import { tagRoutes } from '~/modules/tag';
import { trafficAnalyticRoutes } from '~/modules/trafficAnalytics';

function initializeApp(): Application {

    const app = express();

    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());

    app.set("trust proxy", true);
    app.set("trust proxy", "loopback");

    app.use("/categories", categoryRoutes);
    app.use("/contacts", contactRoutes);
    app.use("/contact-form", contactFormRoutes);
    app.use("/events", eventRoutes);
    app.use("/markets", marketRoutes);
    app.use("/newsletter", newsletterRoutes);
    app.use("/products", productRoutes);
    app.use("/tags", tagRoutes);
    app.use("/analytics/traffic", trafficAnalyticRoutes);

    return app;
};

export default initializeApp;