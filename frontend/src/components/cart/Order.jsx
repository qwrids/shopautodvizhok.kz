import { useOrder } from '@/queries/useOrder';
import styles from './cart.module.scss';
import ReactSelect from 'react-select';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const Order = ({ carts }) => {
  const [firstName, setFirstName] = useState('');
  const [surName, setSurName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState('Безналичный рассчёт');
  const { order } = useOrder();
  const onSubmit = (e) => {
    e.preventDefault();
    if (carts && address && phone && firstName && surName && payment) {
      order({
        carts,
        address,
        phone,
        first_name: firstName,
        last_name: surName,
        payment_method: payment,
        city,
      });
    } else {
      toast.error('Пожалуйста, заполните все поля');
    }
  };

  const options = [
    { value: 'Безналичный рассчёт', label: 'Безналичный рассчёт' },
    { value: 'Наличный рассчёт', label: 'Наличный рассчёт' },
  ];
  return (
    <div className={styles.order}>
      <form onSubmit={onSubmit}>
        <label>Ваше имя</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Введите своё имя"
        />
        <label>Ваша фамилия</label>
        <input
          type="text"
          value={surName}
          onChange={(e) => setSurName(e.target.value)}
          placeholder="Введите свою фамилию"
        />
        <label>Ваш город</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Введите ваш город"
        />
        <label>Ваш адрес</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Введите адрес"
        />
        <label>Ваш контактный номер</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Введите ваш номер"
        />
        <label>Рассчёт</label>
        <ReactSelect
          isSearchable={false}
          onChange={(e) => {
            setPayment(e.value);
          }}
          options={options}
          className="text-gray-600"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              background: '#EFEFF7',
              border: '1px solid #455876',
              marginBottom: '20px',
            }),
          }}
          placeholder="Выберите тип оплаты"
        />
        <button type="submit">Заказать</button>
      </form>
    </div>
  );
};
