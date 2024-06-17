'use client';
import { YMaps, Map } from '@pbe/react-yandex-maps';

export const InteractiveMap = () => {
  return (
    <YMaps>
      <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
    </YMaps>
  );
};
