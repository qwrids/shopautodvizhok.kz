import styles from './promotions.module.scss';

export const Promotions = () => {
  return (
    <div className={styles.root} id="promotions">
      <h2>Наши акции</h2>
      <div className={styles.cards}>
        <div className={styles.card + ' col-span-1'}>
          <h4>-10%</h4>
          <h5>за покупку двух ремешков</h5>
        </div>
        <div className={styles.card + ' col-span-2'}>
          <h5>
            Совершите покупку и наслаждайтесь стильными аксессуарами, зная, что ваше время всегда
            будет под надежной защитой
          </h5>
        </div>
        <div className={styles.card + ' col-span-2'}>
          <h5>
            Уникальное предложение! При покупке любых часов в нашем магазине вы получаете скидку 20%
            на профессиональный ремонт и обслуживание
          </h5>
        </div>
        <div className={styles.card + ' col-span-1'}>
          <h4>-50%</h4>
          <h5>"Спецпредложение: половина стоимости на ремонт часов!"</h5>
        </div>
      </div>
    </div>
  );
};
