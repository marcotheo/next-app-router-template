'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormTextArea from '@/components/ui/FormTextArea';

const formSchema = z.object({
  postText: z.string(),
});

export default function PostForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postText: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormTextArea control={form.control} name='postText' label='Message' />

        <Button type='submit' className='text-lg' size='lg'>
          POST
        </Button>
      </form>
    </Form>
  );
}
