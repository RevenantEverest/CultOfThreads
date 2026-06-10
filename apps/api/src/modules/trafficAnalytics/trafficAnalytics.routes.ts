import express from 'express';
import * as controllers from './controllers';

import {
    pagination,
    auth,
    permissions,
    security
} from '~/middleware';

const router = express.Router();

router.route("/")
.get(
    auth.verifyToken,
    security.isValidOrigin,
    permissions.isAdmin,
    pagination.extractParams,
    controllers.index
)
.post(
    security.isValidOrigin,
    controllers.create
)

export default router;