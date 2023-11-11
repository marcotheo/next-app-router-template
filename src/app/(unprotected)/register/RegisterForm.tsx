'use client';

import { useForm } from 'react-hook-form';
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

export default function RegisterForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof regFormSchema>>({
    resolver: zodResolver(regFormSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof regFormSchema>) => {
    if (values.password !== values.confirmPassword) {
      form.setError('confirmPassword', {
        message: 'does not match password!',
      });
      return;
    }

    try {
      await registerAction(values);
    } catch (e: any) {
      toast({
        title: e.message ?? 'Something Went Wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
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
          <Label htmlFor='terms'>
            By signing up, I agree with <span className='text-accessory'>terms and conditions</span>
          </Label>
        </div>

        <br />

        <Button type='submit' className='w-full text-lg' size='lg'>
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
