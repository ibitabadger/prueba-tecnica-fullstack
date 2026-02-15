"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";

export default function GithubButton() {
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <Button
      onClick={handleLogin}
      className="w-full flex items-center gap-2"
    >
      {/* icono */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-5 h-5"
      >
        <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.86 3.15 8.98 7.52 10.44.55.1.73-.24.73-.53 0-.26-.01-1.12-.02-2.03-3.06.66-3.7-1.3-3.7-1.3-.5-1.27-1.23-1.61-1.23-1.61-1-.69.07-.68.07-.68 1.1.08 1.68 1.13 1.68 1.13.98 1.67 2.57 1.19 3.2.91.1-.71.38-1.19.69-1.46-2.44-.28-5.01-1.22-5.01-5.44 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.41.11-2.94 0 0 .92-.3 3.02 1.12a10.5 10.5 0 0 1 5.5 0C17.56 4.8 18.48 5.1 18.48 5.1c.6 1.53.22 2.66.11 2.94.7.77 1.13 1.75 1.13 2.95 0 4.23-2.58 5.16-5.04 5.43.39.34.73 1 .73 2.02 0 1.46-.01 2.64-.01 3 .72.2 1.4-.61 1.4-.61C20.1 20.73 23.25 16.61 23.25 11.75 23.25 5.48 18.27.5 12 .5z"/>
      </svg>

      Iniciar sesión con GitHub
    </Button>
  );
}
