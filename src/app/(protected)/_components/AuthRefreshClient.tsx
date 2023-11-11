'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import dayjs from 'dayjs';
import { refreshTokenAction } from '@/app/_server/actions/auth';

export interface IAuthRefreshClientProps {
  expiresAt?: number;
}

export default function AuthRefreshClient(props: IAuthRefreshClientProps) {
  const pathname = usePathname();
  const effectRef = useRef(0);

  const runRefreshTokenJob = (expiresAt: number) => {
    const timeLeft = expiresAt - dayjs().unix(); // seconds

    setTimeout(
      async () => {
        const result = await refreshTokenAction(pathname);
        if (!!result) runRefreshTokenJob(result.expiresAt);
      },
      timeLeft * 1000 * 0.8,
    );
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && effectRef.current === 0) {
      effectRef.current = 1;
      return;
    }

    if (!!props.expiresAt) runRefreshTokenJob(props.expiresAt);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
