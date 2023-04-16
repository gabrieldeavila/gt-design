import React from "react";
import ButtonInitial from "../Initial";
import Google from "./Logos/Google";

function ButtonGoogle() {
  return (
    <ButtonInitial
      bg="var(--googleBackground)"
      symbol={<Google />}
      name="Google"
    />
  );
}

export default ButtonGoogle;
