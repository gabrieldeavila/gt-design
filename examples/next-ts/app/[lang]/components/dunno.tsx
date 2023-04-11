"use client";

import { GTBasic, GTLogin } from "@geavila/gt-design";

function Dunno({ serverTranslation }: { serverTranslation: any }) {
  return (
    <GTBasic serverTranslation={serverTranslation}>
      <GTLogin
        onPasswordForgot={() => {
          console.log("forgot");
        }}
      />
    </GTBasic>
  );
}

export default Dunno;
