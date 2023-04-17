import React from "react";
import ButtonInitial from "../Initial";
import Google from "./Logos/Google";
import { IGTButton } from "../../interface";

function ButtonGoogle(props: IGTButton) {
  return (
    <ButtonInitial
      bg="var(--googleBackground)"
      symbol={<Google />}
      name="Google"
      {...props}
    />
  );
}

export default ButtonGoogle;
