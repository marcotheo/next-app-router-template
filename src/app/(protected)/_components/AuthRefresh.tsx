import * as React from 'react';
import { getServerSessionHelper } from '@/session/options';
import AuthRefreshClient from './AuthRefreshClient';

export default async function AuthRefresh() {
  const session = await getServerSessionHelper();
  return <AuthRefreshClient expiresAt={session?.cognito.expiresAt} />;
}
