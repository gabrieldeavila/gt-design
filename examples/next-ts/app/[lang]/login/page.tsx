"use client";

import { GTLoginProviders } from "@geavila/gt-design";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Login({ params }: { params: { lang: "en" | "pt-BR" } }) {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) return router.push(`/${params.lang}/a`);

  return (
    <GTLoginProviders
      onGoogleClick={() => signIn("google", { redirect: false })}
      onGitHubClick={() => signIn("github", { redirect: false })}
    />
  );
}

export default Login;
