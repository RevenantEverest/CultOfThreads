import express from 'express';
import * as controllers from './controllers';
import { security } from '~/middleware';

const router = express.Router();

router.route("/")
.post(
    security.isValidOrigin,
    controllers.createCheckoutSession
)

export default router;