import express from 'express';
import * as controllers from '~/modules/health/controllers';

const router = express.Router();

router.route("/version")
.get(controllers.versionCheck)

export default router;