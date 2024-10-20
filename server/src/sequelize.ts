import { Dialect, Sequelize } from 'sequelize';
import dbConfig from '$root/config/dbConfig';

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect as Dialect,
        logging: console.log,
    },
);

export { sequelize };
