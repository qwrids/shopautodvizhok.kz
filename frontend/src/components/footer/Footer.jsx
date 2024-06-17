import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  return (
    <div className="min-h-60 foreground">
      <div className="container py-10 flex justify-between">
        <div className="w-1/3">
          <img className="max-h-20" src="/logo.png" alt="" />
          <ul className="flex gap-4 mt-8">
            <li>
              <a href="https://www.instagram.com/autodvizhok.kz?igsh=OTd1ZnZva203Z2xy">
                <Image src="/instagram.webp" width={35} height={35} />
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@autodvizhok.kz?_t=8mm0Y5I56fd&_r=1">
                <Image src="/tiktok.webp" width={35} height={35} />
              </a>
            </li>
          </ul>
        </div>
        <div className="w-1/3">
          <h3 className="light-text text-2xl font-medium mb-3">Контактные данные</h3>
          <ul className="flex flex-col gap-2">
            <li className="light-text list-disc ml-4">87013289697</li>
            <li className="light-text list-disc ml-4">87764971484</li>
            <li className="light-text list-disc ml-4">87073279697</li>
            <li className="light-text list-disc ml-4">Улица Аспандияр Кенжин, 5/6</li>
            <li className="light-text list-disc ml-4">lukmanovrashit1@gmail.com</li>
          </ul>
        </div>
        <div className="w-1/3">
          <h3 className="light-text text-2xl font-medium mb-3">Навигация</h3>
          <ul className="flex flex-col gap-4">
            <li className="light-text list-disc ml-4">
              <Link href="/">Главная</Link>
            </li>
            <li className="light-text list-disc ml-4">
              <Link href="/catalog">Каталог</Link>
            </li>
            <li className="light-text list-disc ml-4">
              <Link href="/about">О компании</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
