"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import "./style.css";

// alter title
// alter description
export const metadata = {
  title: "About he",
};

export default function Home() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  console.log(userEmail, status);

  if (status === "loading") {
    return <p>Hang on there...</p>;
  }

  if (status === "authenticated") {
    return (
      <>
        <p>Signed in as {userEmail}</p>
        <button onClick={() => signOut()}>Sign out</button>
        <img src="https://cdn.pixabay.com/photo/2017/08/11/19/36/vw-2632486_1280.png" />
      </>
    );
  }

  return (
    <>
      <p>Not signed in.</p>
      <button onClick={() => signIn("github")}>Sign in</button>
    </>
  );
}
