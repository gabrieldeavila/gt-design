"use client";

/* 
  you probably won't need to change this file
*/

import { GTBasic } from "@geavila/gt-design";
import { SessionProvider } from "next-auth/react";

function GTWrapper({
  serverTranslation,
  lang,
  children,
}: {
  serverTranslation: any;
  lang: any;
  children: React.ReactNode;
}) {

  return (
    <SessionProvider>
      <GTBasic serverTranslation={serverTranslation} lang={lang}>
        {children}
      </GTBasic>
    </SessionProvider>
  );
}

export default GTWrapper;
