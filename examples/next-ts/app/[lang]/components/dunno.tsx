"use client";

import { GTBasic, GTLogin } from "@geavila/gt-design";

function Dunno() {
  return (
    <GTBasic>
      <GTLogin
        onPasswordForgot={() => {
          console.log("forgot");
        }}
      />
    </GTBasic>
  );
}

export default Dunno;
