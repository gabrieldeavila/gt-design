"use client";

import { useTranslations } from "next-intl";
import { GTBasic, GTLogin } from "@geavila/gt-design";

function Dunno() {
  const t = useTranslations();

  return (
    <GTBasic customTranslator={t}>
      <GTLogin
        onPasswordForgot={() => {
          console.log("forgot");
        }}
      />
    </GTBasic>
  );
}

export default Dunno;
