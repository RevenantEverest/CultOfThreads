import { type DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { ENV } from '~/constants';

const dbConfig: DataSourceOptions = {
    type: "postgres",
    url: ENV.DATABASE_URL,
    synchronize: false,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [
        "src/modules/**/*.entity.ts"
    ],
    migrations: [
        "src/migrations/*.ts"
    ],
    migrationsTableName: "_migrations"
};

export default dbConfig;