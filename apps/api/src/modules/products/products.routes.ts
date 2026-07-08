import express from 'express';
import multer from 'multer';
import * as controllers from './controllers';

import { querySchema } from './schemas';

import {
    pagination,
    validation,
    auth,
    permissions,
    security,
    query
} from '~/middleware';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.route("/")
.get(
    auth.verifyToken,
    security.isValidOrigin,
    permissions.isAdmin,
    pagination.extractParams,
    query.parseQueryContext(querySchema),
    controllers.index
)
.post(
    auth.verifyToken,
    security.isValidOrigin,
    permissions.isAdmin,
    upload.array("files"),
    controllers.create
)

router.route("/public")
.get(
    security.isValidOrigin,
    pagination.extractParams,
    query.parseQueryContext(querySchema),
    controllers.indexPublic
)

router.route("/public/id/:id")
.get(
    security.isValidOrigin,
    validation.id,
    controllers.getOnePublic
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
    upload.array("files"),
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