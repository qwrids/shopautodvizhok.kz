'use client';
import { ProductItem } from '@/components/products/ProductItem';
import { Filters } from './Filters';

import { useProducts } from '@/queries/useProducts';

import styles from './catalog.module.scss';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';

import './pagination.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export const Catalog = ({ isPage }) => {
  const [sort, setSort] = useState('name');
  const { data: products, isLoading } = useProducts(sort);

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 12;
  const currentProducts = products?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products?.length / 12);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 12) % products?.length;
    setItemOffset(newOffset);
  };
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['products'],
    });
  }, [sort]);
  return (
    <div className={!isPage ? ' foreground' : ''} id="catalog">
      <div className={styles.inner}>
        <div className="container">
          <div className={styles.heading}>
            <h2
              className={
                isPage ? 'text-5xl font-medium dark-text' : 'text-5xl font-medium light-text'
              }>
              Каталог
            </h2>
            {isPage && <Filters setSort={setSort} sort={sort} isPage={isPage} />}
          </div>
          <div className={styles.list}>
            {isLoading ? (
              <>Loading...</>
            ) : (
              currentProducts?.map((obj) => (
                <ProductItem
                  id={obj.id}
                  img={obj.image}
                  sex={obj.sex_name}
                  title={obj.name}
                  price={obj.price.toLocaleString('ru-RU')}
                  isPage={isPage}
                  count={obj.count}
                />
              ))
            )}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 20,
              boxSizing: 'border-box',
              width: '100%',
              height: '100%',
            }}>
            <ReactPaginate
              breakLabel="..."
              nextLabel={<ArrowRight />}
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel={<ArrowLeft />}
              renderOnZeroPageCount={null}
              containerClassName={'pagination'}
              activeClassName={'item active '}
              breakClassName={'item break-me '}
              disabledClassName={'disabled-page'}
              nextClassName={'item next '}
              previousClassName={'item previous'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
