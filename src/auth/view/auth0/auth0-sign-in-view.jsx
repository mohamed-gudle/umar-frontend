'use client';
import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSearchParams } from 'next/navigation';

// ----------------------------------------------------------------------

export function Auth0SignInView() {
  const { loginWithPopup, loginWithRedirect } = useAuth0();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const handleSignInWithPopup = useCallback(async () => {
    try {
      await loginWithPopup();
    } catch (error) {
      console.error(error);
    }
  }, [loginWithPopup]);

  const handleSignUpWithPopup = useCallback(async () => {
    try {
      await loginWithPopup({ authorizationParams: { screen_hint: 'signup' } });
    } catch (error) {
      console.error(error);
    }
  }, [loginWithPopup]);

  const handleSignInWithRedirect = useCallback(async () => {
    try {
      await loginWithRedirect({
        appState: { returnTo: returnTo || '/' },
      });
    } catch (error) {
      console.error(error);
    }
  }, [loginWithRedirect, returnTo]);

  const handleSignUpWithRedirect = useCallback(async () => {
    try {
      await loginWithRedirect({
        appState: { returnTo: returnTo || '/' },
        authorizationParams: { screen_hint: 'signup' },
      });
    } catch (error) {
      console.error(error);
    }
  }, [loginWithRedirect, returnTo]);

  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        Sign in to your account
      </Typography>

      <Button
        fullWidth
        color="primary"
        size="large"
        variant="contained"
        onClick={handleSignInWithRedirect}
      >
        Sign in
      </Button>

      <Button
        fullWidth
        color="primary"
        size="large"
        variant="soft"
        onClick={handleSignUpWithRedirect}
      >
        Sign up 
      </Button>

  

    </Box>
  );
}
