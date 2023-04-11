"use client";

import { GTBasic } from "@geavila/gt-design";

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
    <GTBasic serverTranslation={serverTranslation} lang={lang}>
      {children}
    </GTBasic>
  );
}

export default GTWrapper;
