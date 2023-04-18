"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import LoginBtn from "./login-btn";
import { GTLoginProviders } from "@geavila/gt-design";

export default function Page() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        {/* <UserInformation data={session.user} /> */}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <GTLoginProviders
      onGoogleClick={() => signIn("google", { redirect: false })}
      onGitHubClick={() => signIn("github", { redirect: false })}
    />
  );
  // return <LoginBtn />;
}
