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

router.route("/view")
.get(
    auth.verifyOrderToken,
    security.isValidOrigin,
    controllers.getByOrderToken
)

router.route("/id/:id/email/confirmation")
.post(
    auth.verifyToken,
    security.isValidOrigin,
    permissions.isAdmin,
    validation.id,
    controllers.sendConfirmationEmail
)

router.route("/id/:id/email/tracking")
.post(
    auth.verifyToken,
    security.isValidOrigin,
    permissions.isAdmin,
    validation.id,
    controllers.sendTrackingEmail
)

export default router;