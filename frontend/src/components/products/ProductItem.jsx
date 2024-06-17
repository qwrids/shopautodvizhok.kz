import Image from 'next/image';

import styles from './products.module.scss';
import { useAddToCart } from '@/queries/useAddToCart';

export const ProductItem = ({ id, img, title, price, isPage, count }) => {
  const { addToCart } = useAddToCart();
  return (
    <div className={isPage ? 'foreground rounded-lg mb-8' : 'rounded-lg mb-8'}>
      <div className={styles.product}>
        <div className={styles.image}>
          <Image
            src={img ? process.env.API_URL + img : '/product-placeholder.png'}
            width={380}
            height={230}
            alt={title}
          />
        </div>
        <div className={styles.info}>
          <h3 className={'light-text'}>{title}</h3>
          <div>
            <p className="light-text">{count ? 'В наличии: ' + count : 'Нет в наличии'}</p>

            <p className={'light-text'}>{price} тг</p>
            <button
              className={styles.cart_add}
              onClick={() => addToCart({ good_id: id, count: 1 })}>
              В корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
