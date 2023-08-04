import { Sequelize } from "sequelize";
import db from "../config/db.config";
import log from "../logger";
import books from '../models/books.model'

const sequelize = new Sequelize(db.name, db.user, db.password, {
    host: db.host,
    dialect: db.driver,
    port: db.port,
    logging: (data) => {
        log.info(`DB: ${data}`)
    }
})

sequelize.authenticate()
.then(() => {
    books(sequelize);
    sequelize.sync();
    log.info("Database connected successfully");
})
.catch((error) => {
    log.error(`Database connection error: ${error}`);
})

export default sequelize;