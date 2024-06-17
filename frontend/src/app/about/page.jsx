'use client';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { Instagram } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const AboutPage = () => {
  return (
    <div>
      <div className="foreground">
        <div className="container flex py-8">
          <div className="w-1/2">
            <h2 className="text-3xl font-medium light-text">Контакты:</h2>
            <ul>
              <li className="list-disc ml-8 light-text">87013289697</li>
              <li className="list-disc ml-8 light-text">87764971484</li>
              <li className="list-disc ml-8 light-text">87073279697</li>
            </ul>

            <h2 className="text-3xl font-medium mt-2 light-text">Адрес:</h2>
            <li className="list-disc ml-4 light-text">Улица Аспандияр Кенжин, 5/6</li>
          </div>
          <div className="w-1/2">
            <h2 className="text-3xl font-medium light-text">Электронная почта:</h2>
            <li className="list-disc ml-4 light-text mb-4">lukmanovrashit1@gmail.com</li>
            <h2 className="text-3xl font-medium mt-4 light-text">Социальные сети:</h2>
            <div className="flex gap-4 mt-4">
              <a href="https://www.instagram.com/autodvizhok.kz?igsh=OTd1ZnZva203Z2xy">
                <Image src="/instagram.webp" width={35} height={35} />
              </a>
              <a href="https://www.tiktok.com/@autodvizhok.kz?_t=8mm0Y5I56fd&_r=1">
                <Image src="/tiktok.webp" width={35} height={35} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="map">
        <YMaps>
          <Map
            width={'100%'}
            height={'65vh'}
            defaultState={{ center: [51.189344, 71.318984], zoom: 17 }}>
            <Placemark geometry={[51.189344, 71.318984]} />
          </Map>
        </YMaps>
      </div>
    </div>
  );
};

export default AboutPage;
