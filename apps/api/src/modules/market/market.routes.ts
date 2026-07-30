import express from 'express';
import multer from 'multer';
import * as controllers from './controllers';

import {
    pagination,
    validation,
    auth,
    permissions,
    security
} from '~/middleware';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

router.route("/")
.get(
    auth.verifyToken,
    security.isValidOrigin,
    permissions.isAdmin,
    pagination.extractParams,
    controllers.index,
)
.post(
    auth.verifyToken,
    security.isValidOrigin,
    permissions.isAdmin,
    upload.single("file"),
    controllers.create
)

router.route("/id/:id")
.get(
    auth.verifyToken,
    security.isValidOrigin,
    permissions.isAdmin,
    validation.id,
    controllers.getOne
)
.put(
    auth.verifyToken,
    security.isValidOrigin,
    permissions.isAdmin,
    validation.id,
    upload.single("file"),
    controllers.update
)
.delete(
    auth.verifyToken,
    security.isValidOrigin,
    permissions.isAdmin,
    validation.id,
    controllers.destroy
)

export default router;