'use client';

import { createContext } from 'react';

// ----------------------------------------------------------------------

export const AuthContext = createContext<any | undefined>(undefined);

export const AuthConsumer = AuthContext.Consumer;
