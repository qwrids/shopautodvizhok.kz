'use client';
import ReactSelect from 'react-select';
import styles from './catalog.module.scss';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const Filters = ({ sort, setSort, isPage }) => {
  const options = [
    { value: 'name', label: 'Алфавиту' },
    { value: 'price', label: 'Цене (дешевле)' },
    { value: '-price', label: 'Цене (дороже)' },
  ];
  return (
    <div className={styles.filters}>
      <p className={isPage ? 'dark-text' : 'light-text'}>Сортировать по:</p>
      <ReactSelect
        className={styles.input}
        defaultValue={sort}
        onChange={(e) => {
          setSort(e.value);
        }}
        options={options}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            background: '#EFEFF7',
            border: '1px solid #455876',
            marginBottom: '20px',
          }),
        }}
        placeholder="Алфавиту"
      />
    </div>
  );
};
