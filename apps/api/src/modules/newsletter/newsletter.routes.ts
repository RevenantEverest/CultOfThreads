import express from 'express';
import * as controllers from './controllers';

import { pagination, validation, auth, security, permissions } from '~/middleware';

const router = express.Router();

router.route("/")
.get(
    auth.verifyToken, 
    security.isValidOrigin, 
    permissions.isAdmin, 
    pagination.extractParams,
    controllers.index
)

router.route("/signup")
.post(security.isValidOrigin, controllers.create)

export default router;