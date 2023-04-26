import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { GTLoginProviders, GTBasic } from "@geavila/gt-design";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <GTBasic>
      {Object.values(providers).map((provider) => (
        <GTLoginProviders
          onGoogleClick={() => signIn("google", { redirect: false })}
          onGitHubClick={() => signIn("github", { redirect: false })}
        />
      ))}
    </GTBasic>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/a" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
