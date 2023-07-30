import { StyledComponent } from "styled-components";

export interface IToastStyle {
  Wrapper: StyledComponent<"div", any, {}, never>;
  Content: StyledComponent<"div", any, {}, never>;
  Timer: StyledComponent<"div", any, {}, never>;
}
