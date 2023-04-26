"use client";

import {
  GTLoginProviders
} from "@geavila/gt-design";
import { signIn } from "next-auth/react";

function d() {
  return (
    <GTLoginProviders
      onGoogleClick={() => signIn("google", { redirect: false })}
      onGitHubClick={() => signIn("github", { redirect: false })}
    />
  );
}

export default d;
