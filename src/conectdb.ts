/* eslint-disable no-path-concat */
import { DataSource } from 'typeorm';
import { User } from './entity/user';
import { Brands } from './entity/brands';
import { Category } from './entity/categorys';
import { Product } from './entity/products';

export let AppDataSource: DataSource = null;

const source = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  // password: 'leelectronic',
  database: 'leelectronic',
  entities: [User, Brands, Category, Product],
  logging: true,
  synchronize: false,
});

export async function InitDBConnection() {
  AppDataSource = await source.initialize();
}
