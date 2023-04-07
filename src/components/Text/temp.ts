import { memo } from "react";
import TextBtn from "./Extras/Btn";
import TextDivider from "./Extras/Divider";
import { P, H1, H2, Strong } from "./Text";

const Text = {
  P,
  H1,
  H2,
  Btn: memo(TextBtn),
  Strong,
  Divider: memo(TextDivider),
};

export default Text;