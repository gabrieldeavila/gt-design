"use client";

import { GTBasic, GTLogin } from "@geavila/gt-design";
import Cookies from "js-cookie";
import React from "react";

function Dunno() {
  const [isState, setState] = React.useState(false);

  React.useEffect(() => {
    Cookies.set("name", "value");

    console.log(isState);
  }, [isState]);

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
