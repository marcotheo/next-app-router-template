import Header from './_components/Header';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-full flex-col bg-gradient-to-tl from-accessory via-primarybg to-black'>
      <Header />
      <div className='flex h-full items-center'>
        <div className='mx-auto w-[100%] text-white md:w-[90%]'>{children}</div>
      </div>
    </div>
  );
}
