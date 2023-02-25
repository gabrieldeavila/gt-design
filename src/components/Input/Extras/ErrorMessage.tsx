import React from "react";
import { useTranslation } from "react-i18next";
import Input from "../Input";
import { IErrorMessage } from "../interface";

function ErrorMessage({ message, params, isWrong }: IErrorMessage) {
  const { t } = useTranslation();

  if (!isWrong) return null;

  return (
    <Input.ErrorWrapper>
      <Input.Error>{t(message, params)}</Input.Error>
    </Input.ErrorWrapper>
  );
}

export default ErrorMessage;
