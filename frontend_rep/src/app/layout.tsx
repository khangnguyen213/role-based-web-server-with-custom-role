import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import dynamic from 'next/dynamic';
// import Header from '@/components/header';
const Header = dynamic(() => import('@/components/header'), { ssr: false });
import StoreProvider from './StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Simple role-based auth web',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
