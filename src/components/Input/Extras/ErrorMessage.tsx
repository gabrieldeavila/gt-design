import React from "react";
import useGTTranslate from "../../../gt/Global/translate";
import Input from "../Input";
import { IErrorMessage } from "../interface";

function ErrorMessage({ message, params, isWrong }: IErrorMessage) {
  const { translateThis } = useGTTranslate();

  if (!isWrong) return null;

  return (
    <Input.ErrorWrapper>
      <Input.Error>{translateThis(message, params)}</Input.Error>
    </Input.ErrorWrapper>
  );
}

export default ErrorMessage;
