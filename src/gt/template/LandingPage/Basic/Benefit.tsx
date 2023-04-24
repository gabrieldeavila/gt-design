import React from "react";
import { Space, Text } from "../../../../components";
import { IBenefit } from "../interface";
import useGTTranslate from "../../../Global/translate";

function Benefit({ title, description, icon }: IBenefit) {
  const Icon = React.createElement(icon.type, {
    color: "var(--contrast)",
    size: "2rem",
  });
  const { translateThis } = useGTTranslate();

  return (
    <Space.Center
      flexGrow="1"
      gridGap="0.5rem"
      flexDirection="column"
      width="15rem"
    >
      {Icon}
      <Text.P fontSize="1.25rem" fontWeight="500">
        {translateThis(title)}
      </Text.P>
      <Text.P textAlign="center" fontWeight="200">
        {translateThis(description)}
      </Text.P>
    </Space.Center>
  );
}

export default Benefit;
