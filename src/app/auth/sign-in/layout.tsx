
import { GuestGuard } from '@/auth/guard';

// ----------------------------------------------------------------------

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GuestGuard>
      <div>{children}</div>
    </GuestGuard>
  );
}
