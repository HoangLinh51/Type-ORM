/* eslint-disable no-path-concat */
import { DataSource } from 'typeorm';
import { User } from './entity/user';
import { Brands } from './entity/brands';
import { Categories } from './entity/categories';
import { Product } from './entity/products';
// import { Order } from './entity/order';
// import { Shippingaddress } from './entity/shipping_address';
// import { Shippinginformation } from './entity/shipping_information';
// import { Orderline } from './entity/order_line';

export let AppDataSource: DataSource = null;

const source = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  // password: 'leelectronic',
  database: 'leelectronic',
  entities: [User, Brands, Categories, Product],
  logging: true,
  synchronize: false,
});

export async function InitDBConnection() {
  AppDataSource = await source.initialize();
}

// , Order, Shippingaddress, Shippinginformation, Orderline
