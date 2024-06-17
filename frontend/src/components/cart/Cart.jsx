import { useCart } from '@/queries/useCart';
import { ProductCartItem } from '../products/ProductCartItem';
import styles from './cart.module.scss';
import { useOrder } from '@/queries/useOrder';
import { useState } from 'react';
import { useOutside } from '@/hooks/useOutside';
import { Modal } from '../modal-wrapper/Modal';
import { Order } from './Order';
import { ModalLeft } from '../modal-wrapper-left/ModalLeft';
import useAuthStore from '@/store';

export const Cart = () => {
  const { ref, isShow, setIsShow } = useOutside();

  const { data: cartProducts } = useCart();
  const { isLoggedIn } = useAuthStore();

  console.log(cartProducts);
  const carts = cartProducts?.data?.map((obj) => obj.id);
  return (
    <>
      <div className={styles.root}>
        <div className={styles.heading}>
          <h3>Ваша корзина</h3>
          <p>
            Сумма: <span>{cartProducts?.sum_price.toLocaleString('ru-RU') || 0} тг</span>
          </p>
        </div>
        {isLoggedIn ? (
          <div className={styles.list}>
            {cartProducts?.data?.map((obj) => (
              <ProductCartItem
                count={obj.count}
                id={obj.id}
                prouct_id={obj.good.id}
                img={obj.good.image}
                sex={obj.good.sex_name}
                title={obj.good.name}
                price={obj.good.price.toLocaleString('ru-RU')}
              />
            ))}
          </div>
        ) : (
          <p className="text-lg max-w-96 text-center h-full flex items-center">
            Пожалуйста авторизуйтесь чтобы добавлять товары в корзину
          </p>
        )}
        {cartProducts?.data?.length ? (
          <button onClick={() => setIsShow(!isShow)}>Оформить</button>
        ) : (
          <></>
        )}
      </div>
      <ModalLeft isShow={isShow}>
        <div ref={ref}>
          <Order carts={carts} />
        </div>
      </ModalLeft>
    </>
  );
};
