import { memo } from "react";
import TextBtn from "./Extras/Btn";
import TextDivider from "./Extras/Divider";
import { P, H1, H2, Strong, TextAction, TextTitle, TextSubtitle } from "./Text";

const Text = {
  P,
  H1,
  H2,
  Strong,
  Btn: memo(TextBtn),
  Divider: memo(TextDivider),
  Title: TextTitle,
  Subtitle: TextSubtitle,
  Action: TextAction,
};

export default Text;
