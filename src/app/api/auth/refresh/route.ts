import { refreshToken } from '@/app/_server/service/auth';
import { z } from 'zod';

const schema = z.object({
  username: z.string(),
  refreshToken: z.string(),
});

export async function POST(request: Request) {
  const params = await request.json();

  const data = schema.safeParse(params);

  if (data.success === false) return new Response('Invalid input', { status: 400 });

  const result = await refreshToken({
    username: data.data.username,
    refreshToken: data.data.refreshToken,
  });

  return Response.json(result);
}
