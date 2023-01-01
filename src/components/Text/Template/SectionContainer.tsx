import React from "react";
import { useTranslation } from "react-i18next";
import { ISectionContainer } from "../interface";
import Text from "../Text";

function SectionContainer({ title, subtitle }: ISectionContainer) {
  const { t } = useTranslation();

  return (
    <>
      <Text.H1 my="5px">{title}</Text.H1>
      <Text.P fontSize={1} mb="2rem">
        {t(subtitle)}
      </Text.P>
    </>
  );
}

export default SectionContainer;
