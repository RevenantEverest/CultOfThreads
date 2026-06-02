import "reflect-metadata";

import initializeApp from '~/app';
import AppDataSource from '~/db/dataSource';
import waitForPostgres from '~/db/waitForPostgres';
import * as Entities from '@repo/entities';

import { ENV } from '~/constants';
import { logs } from '~/utils';

(async function main() {
    
    await waitForPostgres(AppDataSource);
    logs.log({ type: "DB", message: `Loaded ${Object.keys(Entities).length} entities` });
    
    const PORT = ENV.API_PORT || 3001;

    const app = initializeApp();

    app.listen(PORT, () => {
        return logs.log({ type: "HTTP", message: `Cult of Threads API: Listening on port ${PORT}` });
    });
})();