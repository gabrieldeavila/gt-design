import React from "react";
import GTEasyState from "../EasyState/GTEasyState";
import { GTInput } from "../Input";
import { ITranslate } from "./interface";

function GTTranslate({ options }: ITranslate) {
  const handleLanguageSelect = async () => {
    // await i18n.changeLanguage(selected.value.toString());
  };

  return (
    <GTEasyState
      name="gt_design_translate"
      initial={
        {
          // language: i18n.language,
        }
      }
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
