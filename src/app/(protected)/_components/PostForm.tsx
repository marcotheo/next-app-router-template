import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormTextArea from '@/components/ui/FormTextArea';
import LoaderOverlay from '@/components/ui/loader_overlay';
import { createPostAction } from '@/app/_server/actions/posts';

const formSchema = z.object({
  caption: z.string(),
});

export default function PostForm({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await createPostAction(values);
    form.reset();
    onClose();
    setLoading(false);
  }

  return (
    <Form {...form}>
      <LoaderOverlay isLoading={loading} />
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormTextArea control={form.control} name='caption' placeholder='Caption' />

        <Button type='submit' className='text-md px-5' size='sm'>
          POST
        </Button>
      </form>
    </Form>
  );
}
