import express from 'express';
import config from './config';
import log from './logger';
import routes from './routes';
import sequelize from './db/connect';

const port = config.port as number;
const host = config.host as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, async () => {
    await sequelize.sync()
    routes(app);
    log.info(`Server listing at http://${host}:${port}`);

});