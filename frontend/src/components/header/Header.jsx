import { LogOut, ShoppingBasket, User } from 'lucide-react';

import { SideModal } from '../side-modal-wrapper/SideModal';

import { useOutside } from '@/hooks/useOutside';

import { Cart } from '../cart/Cart';
import { useEffect, useState } from 'react';
import { Orders } from '../cart/Orders';
import { Modal } from '../modal-wrapper/Modal';
import Auth from '../auth/Auth';
import useAuthStore from '@/store';

import styles from './header.module.scss';
import Link from 'next/link';

export const Header = () => {
  const { ref, isShow, setIsShow } = useOutside(false);
  const { ref: authModalRef, isShow: isAuthShow, setIsShow: setIsAuthShow } = useOutside(false);

  const [isCart, setIsCart] = useState(true);

  const { isLoggedIn, logout } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      setIsAuthShow(false);
    }
  }, [isLoggedIn]);

  console.log(isLoggedIn);

  return (
    <div className="container">
      <header className={styles.root}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="" />
        </div>
        <ul>
          <li>
            <Link href="/">Главная</Link>
          </li>
          <li>
            <Link href="/catalog">Каталог</Link>
          </li>
          <li>
            <Link href="/about">О компании</Link>
          </li>
          <li className="cursor-pointer" onClick={() => setIsShow(!isShow)}>
            <ShoppingBasket />
          </li>
          {!isLoggedIn ? (
            <li className="cursor-pointer" onClick={() => setIsAuthShow(!isAuthShow)}>
              <User />
            </li>
          ) : (
            <li className="cursor-pointer" onClick={() => logout()}>
              <LogOut />
            </li>
          )}
        </ul>
        <SideModal isShow={isShow}>
          <div ref={ref} className="px-8 pt-4 pr-12">
            {isLoggedIn && (
              <div className="flex justify-between text-xl mb-4 gap-24">
                <p
                  className={
                    isCart
                      ? 'border-b-2 border-black cursor-pointer hover:bg-orange-200 px-4 py-2 '
                      : 'cursor-pointer hover:bg-orange-200 px-4 py-2 '
                  }
                  onClick={() => setIsCart(true)}>
                  Корзина
                </p>
                <p
                  className={
                    !isCart
                      ? 'border-b-2 border-black cursor-pointer hover:bg-orange-200 px-4 py-2 '
                      : 'cursor-pointer hover:bg-orange-200 px-4 py-2 '
                  }
                  onClick={() => setIsCart(false)}>
                  Заказы
                </p>
              </div>
            )}
            {isCart ? <Cart /> : <Orders />}
          </div>
        </SideModal>
        <Modal isShow={isAuthShow}>
          <div ref={authModalRef}>
            <Auth />
          </div>
        </Modal>
      </header>
    </div>
  );
};
