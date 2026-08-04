import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';

import { categoryRoutes } from '~/modules/category';
import { contactRoutes } from '~/modules/contact';
import { contactFormRoutes } from '~/modules/contactForm';
import { eventRoutes } from '~/modules/event';
import { marketRoutes } from './modules/market';
import { newsletterRoutes } from '~/modules/newsletter';
import { productRoutes } from '~/modules/products';
import { tagRoutes } from '~/modules/tag';
import { trafficAnalyticRoutes } from '~/modules/trafficAnalytics';

import { healthRoutes } from '~/modules/health';

function initializeApp(): Application {

    const app = express();
    const limiter = rateLimit({
        windowMs: 10 * (60 * 1000), // 10 minutes
        limit: 100,
        standardHeaders: "draft-8",
        legacyHeaders: false,
        ipv6Subnet: 60
    });

    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(limiter);

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

    app.use("/health", healthRoutes);

    return app;
};

export default initializeApp;