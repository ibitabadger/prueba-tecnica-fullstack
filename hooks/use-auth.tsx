// hooks/use-auth-actions.ts
import { authClient } from '@/lib/auth/client';
import { useRouter } from "next/router";
import { useState } from "react";

export function useAuthActions() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const logout = async () => {
    setIsPending(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
    setIsPending(false);
  };

  return { logout, isPending };
}