import express from 'express';
import * as controllers from './controllers';

import { pagination, validation, auth, security } from '~/middleware';

const router = express.Router();

router.route("/")
.get(auth.verifyToken, pagination.extractParams, controllers.index)
.post(security.isValidOrigin, controllers.create)

router.route("/id/:id")
.get(auth.verifyToken, validation.id, controllers.getOne)
.delete(auth.verifyToken, validation.id, controllers.destroy)

export default router;