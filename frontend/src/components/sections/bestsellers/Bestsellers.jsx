import { ProductItem } from '@/components/products/ProductItem';
import { useBestsellers } from '@/queries/useBestsellers';
import React from 'react';

export const Bestsellers = () => {
  const { data: bestsellers } = useBestsellers();
  return (
    <div className="py-12" id="bestsellers">
      <h3 className="text-6xl mb-12">Лидеры продаж</h3>
      <div className="flex gap-8">
        {bestsellers?.map((obj) => (
          <ProductItem
            id={obj.id}
            img={obj.image}
            sex={obj.sex_name}
            title={obj.name}
            price={obj.price}
          />
        ))}
      </div>
    </div>
  );
};
