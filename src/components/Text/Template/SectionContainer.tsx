import React, { memo } from "react";
import Text from "../temp";
import { ISectionContainer } from "../interface";
import useGTTranslate from "../../../gt/Global/translate";

const SectionContainer = memo(function SectionContainer({
  title,
  subtitle,
}: ISectionContainer) {
  const { translateThis } = useGTTranslate();

  return (
    <>
      <Text.H1 my="5px">{translateThis(title)}</Text.H1>
      <Text.P fontSize={1} mt="0" mb="2rem">
        {translateThis(subtitle)}
      </Text.P>
    </>
  );
});

export default SectionContainer;
