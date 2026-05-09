import "reflect-metadata";

import { DataSource } from 'typeorm';
import { dbConfig } from '~/config';

const AppDataSource = new DataSource(dbConfig);

export default AppDataSource;