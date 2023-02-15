import { DataSource } from "typeorm"
import { User } from "/sale-electronic/src/entity/user.register"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    // password: "test",
    database: "leelectronic",
    entities: [User],
    logging: true,
    synchronize: false,
})
