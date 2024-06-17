import { useOrderedProducts } from '@/queries/useOdreredProducts';
import { ProductCartItem } from '../products/ProductCartItem';
import styles from './cart.module.scss';

export const Orders = () => {
  const { data: products } = useOrderedProducts();
  console.log(products);
  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        <h3>Ваши заказы</h3>
      </div>
      <div className={styles.list}>
        {products?.map((obj) => (
          <ProductCartItem
            isOrder={true}
            count={obj.count}
            id={obj.id}
            prouct_id={obj.good.id}
            img={obj.good.image}
            title={obj.good.name}
            price={obj.good.price.toLocaleString('ru-RU')}
          />
        ))}
      </div>
    </div>
  );
};
