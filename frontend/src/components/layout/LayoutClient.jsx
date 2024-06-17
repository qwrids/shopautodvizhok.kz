'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';

import styles from './layout.module.scss';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export const LayoutClient = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <div className={styles.root}>
          <Header />
          {children}
        </div>
        <Footer />
        <Toaster position="bottom-right" reverseOrder={false} />
      </main>
    </QueryClientProvider>
  );
};
