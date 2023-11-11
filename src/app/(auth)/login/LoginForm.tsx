'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { TbUser } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/ui/FormInput';
import PasswordInput from '@/components/ui/passwordInput';
import Alert from '@/components/ui/alert';
import { Collapsible } from '@/components/ui/collapsible';
import LoaderOverlay from '@/components/ui/loader_overlay';

const formSchema = z.object({
  username: z.string().min(1, 'Required'),
  password: z.string().min(6, 'Invalid Password'),
});

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const result = await signIn('credentials', { ...values, redirect: false });
    if (result?.status === 401) setError('Credentials invalid! Please review your login details.');
    else if (!result?.ok) setError('Something Went Wrong! Try again.');

    if (!result?.ok) {
      setTimeout(() => {
        setError(null);
      }, 3000);

      setLoading(false);
      return;
    }

    router.refresh();
    router.push('/');
    setLoading(false);
  };

  return (
    <Form {...form}>
      <LoaderOverlay isLoading={loading} />
      <Collapsible open={!!error}>
        <Alert type='error' text={error ?? ''} />
        <br />
      </Collapsible>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormInput control={form.control} name='username' placeholder='Username' Icon={TbUser} />
        <div>
          <PasswordInput control={form.control} name='password' placeholder='Password' />
          <Button variant='link' className='p-0'>
            Forgot Password?
          </Button>
        </div>

        <Button type='submit' className='w-full text-lg' size='lg'>
          Sign In
        </Button>

        <div className='w-full p-0 text-center text-sm font-semibold text-accessory xs:hidden'>
          <Link href='/register'>Sign Up Now</Link>
        </div>
      </form>
    </Form>
  );
}
