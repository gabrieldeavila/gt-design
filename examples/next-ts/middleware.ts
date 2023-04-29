import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }: { token: any }) => {
      return token;
    },
  },
});

export const config = {
  matcher: ["/a"],
};
