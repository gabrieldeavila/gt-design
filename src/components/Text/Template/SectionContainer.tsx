import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { ISectionContainer } from "../interface";
import Text from "../Text";

const SectionContainer = memo(function SectionContainer({
  title,
  subtitle,
}: ISectionContainer) {
  const { t } = useTranslation();

  return (
    <>
      <Text.H1 my="5px">{t(title)}</Text.H1>
      <Text.P fontSize={1} mt="0" mb="2rem">
        {t(subtitle)}
      </Text.P>
    </>
  );
});

export default SectionContainer;
