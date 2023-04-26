import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return token;
      },
      unAuthorized: () => {
        console.log("kkk");
      },
    },
  }
);

export const config = {
  matcher: ["/a"],
};
