import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function AuthNav() {
  const session = await auth();
  return (
    <>
      {session ? null : (
        <Link href={`/user-login`}>
          <Button variant="ghost" size="lg">
            Login
          </Button>
        </Link>
      )}
    </>
  );
}
