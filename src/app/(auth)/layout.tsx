import Header from './_components/Header';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-full flex-col bg-gradient-to-b from-secondary to-primarybg sm:bg-gradient-to-tl sm:from-accessory sm:via-primarybg sm:to-black'>
      <Header />
      <div className='flex h-full items-center'>
        <div className='mx-auto w-[100%] text-white sm:w-[90%]'>
          <div className='mx-auto w-[100%] rounded-sm p-5 xs:p-8 sm:bg-gray-700 sm:shadow-xl sm:drop-shadow-lg lg:w-[600px]'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
