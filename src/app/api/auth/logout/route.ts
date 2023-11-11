import { logout } from '@/app/_server/service/auth';
import { z } from 'zod';

const schema = z.object({
  accessToken: z.string(),
});

export async function POST(request: Request) {
  const params = await request.json();

  const data = schema.safeParse(params);

  if (data.success === false) return new Response('Invalid input', { status: 400 });

  try {
    await logout({ accessToken: data.data.accessToken });
    return Response.json({ status: 'success' });
  } catch (err) {
    console.error(err);
    throw {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'auth.ts: logout failed',
    };
  }
}
