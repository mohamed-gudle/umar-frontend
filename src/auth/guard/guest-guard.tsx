'use client';

import { useState, useEffect } from 'react';

import { useAuthContext } from '../hooks';
import { useRouter, useSearchParams } from 'next/navigation';

// ----------------------------------------------------------------------

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const { loading, authenticated } = useAuthContext();

  const [isChecking, setIsChecking] = useState(true);

  const returnTo = searchParams.get('returnTo') || '/';

  const checkPermissions = async () => {
    if (loading) {
      return;
    }

    if (authenticated) {
      router.replace(returnTo);
      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  if (isChecking) {
    return <div>Loading</div>;
  }
  return <>{children}</>;
}
