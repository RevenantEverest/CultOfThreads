import express, { raw } from 'express';
import * as controllers from '~/modules/webhooks/controllers';

const router = express.Router();

router.route("/stripe")
.post(raw({ type: "application/json" }), controllers.stripe)

export default router;