/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useMemo } from "react";
import { Space } from "../../components";
import SectionContainer from "../../components/Text/Template/SectionContainer";
import GTTranslate from "../../components/Translate/GTTranslate";
import { GTBasic } from "../../gt";

export default {
  title: "Data Entry/Translate",
};

const Template = () => {
  const options = useMemo(
    () => [
      { value: "en", label: "🇺🇸 English" },
      { value: "pt-BR", label: "🇧🇷 Português" },
    ],
    []
  );

  return (
    <GTBasic>
      <Space.Horizontal>
        <SectionContainer
          title="STORIES.TRANSLATE.TITLE"
          subtitle="STORIES.TRANSLATE.SUBTITLE"
        />
        <GTTranslate options={options} />
      </Space.Horizontal>
    </GTBasic>
  );
};

export const Translate = Template.bind({});
