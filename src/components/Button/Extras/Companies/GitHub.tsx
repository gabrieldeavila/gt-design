import React from "react";
import ButtonInitial from "../Initial";
import { GitHub } from "react-feather";
import { IGTButton } from "../../interface";

function ButtonGitHub(props: IGTButton) {
  return (
    <ButtonInitial
      bg="var(--githubBackground)"
      symbol={<GitHub />}
      name="GitHub"
      {...props}
    />
  );
}

export default ButtonGitHub;
