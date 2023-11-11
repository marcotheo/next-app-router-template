import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

export const metadata: Metadata = {
  title: 'Crowd',
  description: 'for fun project crowd media',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='flex h-screen min-h-screen flex-col overflow-y-auto bg-primarybg'>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
