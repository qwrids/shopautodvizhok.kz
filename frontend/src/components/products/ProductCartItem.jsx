'use client';
import { useState } from 'react';
import Image from 'next/image';

import styles from './products.module.scss';
import { useUpdateCount } from '@/queries/useUpdateCount';
import { Trash } from 'lucide-react';
import { useDeleteFromCart } from '@/queries/useDeleteFromCart';

export const ProductCartItem = ({ isOrder, count, id, img, title, price }) => {
  const [countLocal, setCountLocal] = useState(count);

  const { updateCount } = useUpdateCount();

  const { deleteFromCart } = useDeleteFromCart();

  return (
    <div className={styles.product_cart}>
      <div className={styles.product_content}>
        <div className={styles.image}>
          <Image
            src={img ? process.env.API_URL + img : '/product-placeholder.png'}
            width={380}
            height={230}
          />
        </div>
        <div className={styles.info}>
          <h3>{title}</h3>
          <p>{price} тг</p>
        </div>
      </div>
      {isOrder ? (
        <p className="dark-text">Количество: {count}</p>
      ) : (
        <div className="flex justify-between items-end">
          <div className={styles.counter}>
            <p
              onClick={() => {
                setCountLocal(countLocal - 1);
                updateCount({ cart_id: id, count: countLocal - 1 });
              }}>
              -
            </p>
            <p>{countLocal >= 1 ? countLocal : setCountLocal(1)}</p>
            <p
              onClick={() => {
                setCountLocal(countLocal + 1);
                updateCount({ cart_id: id, count: countLocal + 1 });
              }}>
              +
            </p>
          </div>
          <Trash
            className="cursor-pointer hover:opacity-80 duration-300 ease-in-out"
            color="#455876"
            onClick={() => deleteFromCart(id)}
          />
        </div>
      )}
    </div>
  );
};
