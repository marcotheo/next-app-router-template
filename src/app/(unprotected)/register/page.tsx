import RegisterForm from './RegisterForm';

export default function Register() {
  return (
    <div className='mx-auto w-[90%] rounded-sm bg-gray-700 p-8 shadow-xl drop-shadow-lg lg:w-[600px]'>
      <div className='w-fit border-b-[5px] border-accessory pb-3'>
        <h1 className='text-5xl font-medium'>Sign Up</h1>
      </div>

      <br />

      <RegisterForm />
    </div>
  );
}
