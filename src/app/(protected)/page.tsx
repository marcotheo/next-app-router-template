import PostForm from './_components/PostForm';
import Posts from './_components/Posts';

export default async function Home() {
  return (
    <main className='mx-auto flex w-[80%] flex-col justify-center space-y-5 pt-6 lg:w-[60%]'>
      {/* <div className="rounded-md bg-gray-200 p-6">
        <PostForm />
      </div> */}

      <div className='flex flex-col space-y-3'>
        <Posts />
      </div>
    </main>
  );
}
