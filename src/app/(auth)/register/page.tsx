import RegisterForm from './RegisterForm';

export default function Register() {
  return (
    <>
      <div className='w-fit border-b-[5px] border-accessory pb-3'>
        <h1 className='text-5xl font-medium'>Sign Up</h1>
      </div>

      <br />

      <RegisterForm />
    </>
  );
}
