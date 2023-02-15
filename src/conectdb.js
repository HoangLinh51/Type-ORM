"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var user_register_1 = require("/sale-electronic/src/entity/user.register");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    // password: "test",
    database: "leelectronic",
    entities: [user_register_1.User],
    logging: true,
    synchronize: false,
});
