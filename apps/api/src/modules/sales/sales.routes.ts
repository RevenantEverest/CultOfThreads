import express from 'express';
import * as controllers from './controllers';
import { auth, pagination, permissions, query, security, validation } from '~/middleware';

const router = express.Router();

router.route("/")
.get(
    auth.verifyToken,
    security.isValidOrigin,
    permissions.isAdmin,
    pagination.extractParams,
    // query.parseQueryContext,
    controllers.index
)
.post(
    auth.verifyToken,
    security.isValidOrigin,
    permissions.isAdmin,
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
    controllers.update
)
.delete(
    auth.verifyToken,
    security.isValidOrigin,
    permissions.isAdmin,
    validation.id,
    controllers.destroy
)

router.route("/aggregate/totals")
.get(
    auth.verifyToken,
    security.isValidOrigin,
    permissions.isAdmin,
    controllers.aggregateSales
)

export default router;