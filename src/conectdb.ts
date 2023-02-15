import { DataSource } from "typeorm";
import { User } from "./entity/user";

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
});
