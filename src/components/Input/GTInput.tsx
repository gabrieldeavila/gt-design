import { memo } from "react";
import GTInputEmail from "./Fields/Email";
import GTInputNumber from "./Fields/Number";
import GTInputMask from "./Fields/Mask";
import GTInputPassword from "./Fields/Password";
import GTInputSelect from "./Fields/Select";
import GTInputText from "./Fields/Text";

const GTInput = {
  Text: memo(GTInputText),
  Email: memo(GTInputEmail),
  Password: memo(GTInputPassword),
  Select: memo(GTInputSelect),
  Number: memo(GTInputNumber),
  Mask: memo(GTInputMask),
};

export default GTInput;
