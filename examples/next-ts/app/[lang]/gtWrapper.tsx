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
      <GTBasic
        serverTranslation={serverTranslation}
        themeConfig={{
          global: {
            theme: {
              loginBackground1: "red",
              loginBackground2: "pink",
              loginBackground3: "red",
            },
            darkTheme: {
              primary: "#080808",
            },
          },
        }}
        lang={lang}
      >
        {children}
      </GTBasic>
    </SessionProvider>
  );
}

export default GTWrapper;
