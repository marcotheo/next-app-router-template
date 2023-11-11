'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { TbUser } from 'react-icons/tb';

import { registerAction } from '@/app/_server/actions/auth';
import { regFormSchema } from '@/app/_server/actions/form_schema';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/ui/FormInput';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import PasswordInput from '@/components/ui/passwordInput';
import { useToast } from '@/components/ui/use-toast';
import LoaderOverlay from '@/components/ui/loader_overlay';

export default function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof regFormSchema>>({
    resolver: zodResolver(regFormSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof regFormSchema>) => {
    setLoading(true);
    if (values.password !== values.confirmPassword) {
      form.setError('confirmPassword', {
        message: 'does not match password!',
      });
      setLoading(false);
      return;
    }

    try {
      await registerAction(values);
      const result = await signIn('credentials', { username: values.username, password: values.password, redirect: false });
      if (result?.status === 401 || !result?.ok) throw 'Something Went Wrong! Try again.';

      router.refresh();
      router.push('/');
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      toast({
        title: e.message ?? 'Something Went Wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <LoaderOverlay isLoading={loading} />
      <form onSubmit={form.handleSubmit((data) => onSubmit(data))} className='space-y-7'>
        <FormInput control={form.control} name='username' placeholder='Username' Icon={TbUser} />

        <PasswordInput control={form.control} name='password' placeholder='Password' withPasswordReqList />
        <PasswordInput
          control={form.control}
          name='confirmPassword'
          placeholder='Confirm Password'
          isPassed={form.watch('password') !== '' && form.watch('password') === form.watch('confirmPassword')}
        />

        <br />

        <div className='flex items-center space-x-2'>
          <Checkbox id='terms' />
          <Label htmlFor='terms' className='text-xs sm:text-sm'>
            By signing up, I agree with <span className='text-accessory'>terms and conditions</span>
          </Label>
        </div>

        <br />

        <Button type='submit' className='w-full text-lg' size='lg'>
          Sign Up
        </Button>

        <div className='w-full p-0 text-center text-sm font-semibold text-accessory xs:hidden'>
          <span className='text-gray-300'>
            Already have an Account?{' '}
            <Link href='/login' className='text-accessory'>
              Login now
            </Link>
          </span>
        </div>
      </form>
    </Form>
  );
}
