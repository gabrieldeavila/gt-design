import React from "react";
import ButtonInitial from "../Initial";
import { GitHub } from "react-feather";

function ButtonGitHub() {
  return (
    <ButtonInitial
      bg="var(--githubBackground)"
      symbol={<GitHub />}
      name="GitHub"
    />
  );
}

export default ButtonGitHub;
