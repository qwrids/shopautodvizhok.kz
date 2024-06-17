'use client';

import { InteractiveMap } from '@/components/map/Map';
import { Bestsellers, Catalog, Main, Promotions } from '@/components/sections';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Main />
      <Catalog />
      <div className="map">
        <YMaps>
          <Map width={'100%'} defaultState={{ center: [51.189344, 71.318984], zoom: 17 }}>
            <Placemark geometry={[51.189344, 71.318984]} />
          </Map>
        </YMaps>
      </div>
    </div>
  );
}
