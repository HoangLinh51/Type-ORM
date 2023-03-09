import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Categories } from './categories';
import { Product } from './products';

@Entity({
  name: 'products_categories_categorys',
})
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, product => product.productcategories)
  product: Product;

  @ManyToOne(() => Categories, category => category.productcategories)
  category: Categories;
}
