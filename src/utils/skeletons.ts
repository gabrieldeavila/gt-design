import { css } from "styled-components";
import animations from "./animations";
import { gtTransparentize } from "./colors";

const after = css`
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-80%);
    background-image: linear-gradient(
      90deg,
      ${gtTransparentize({ amount: 1, varName: "secondary" })} 0,
      ${gtTransparentize({ amount: 0.2, varName: "secondary" })} 20%,
      ${gtTransparentize({ amount: 0.8, varName: "secondary" })} 60%,
      ${gtTransparentize({ amount: 1, varName: "secondary" })}
    );
    animation: skeleton 1s linear infinite;
    ${animations.skeleton}
  }
`;

const skeletons = {
  after,
};

export default skeletons;
