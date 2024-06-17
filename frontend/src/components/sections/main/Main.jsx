import Image from 'next/image';

import styles from './main.module.scss';

export const Main = () => {
  return (
    <div className="container">
      <div className={styles.root}>
        <div className={styles.title}>
          <h1 className="button-text font-medium">Добро пожаловать</h1>
          <span className="text-4xl">в наш магазин автозапчастей!</span>
          <p className="text-2xl">
            <br />
            Оригинальные запчасти для автомобилей самых различных годов выпуска
            <br />
            Срок проверки от 3 до 14 дней
          </p>
        </div>
        <div className={styles.main_bg}>
          <Image src={'/intro-media.png'} width={652} height={458} />
        </div>
      </div>
    </div>
  );
};
