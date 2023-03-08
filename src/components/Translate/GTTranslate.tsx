import i18n from "i18next";
import React from "react";
import GTEasyState from "../EasyState/GTEasyState";
import { GTInput } from "../Input";
import { SelectionOptions } from "../Input/Fields/interface";
import { ITranslate } from "./interface";

function GTTranslate({ options }: ITranslate) {
  const handleLanguageSelect = async (selected: SelectionOptions) => {
    await i18n.changeLanguage(selected.value.toString());
  };

  return (
    <GTEasyState
      starterState={{
        language: i18n.language,
      }}
    >
      <GTInput.Select
        disableClearable
        label="TRANSLATE.LANGUAGE"
        options={options}
        name="language"
        onSelect={handleLanguageSelect}
      />
    </GTEasyState>
  );
}

export default GTTranslate;
