import { css } from "styled-components";

const easeOpenClose = css`
  @keyframes popup {
    0% {
      opacity: 0;
      transform: translateY(-0.5rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes popupReverse {
    0% {
      opacity: 1;

      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-0.5rem);
    }
  }
`;

const easeOpacity = css`
  @keyframes opacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes opacityReverse {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const easeShow = css`
  @keyframes show {
    0% {
      opacity: 0;
      transform: translateY(-5rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes showReverse {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-5rem);
    }
  }
`;

const upLabel = css`
  animation: ${({ up }: { up: boolean }) =>
    up
      ? "up 0.2s ease-in-out forwards"
      : "upReverse 0.2s ease-in-out forwards"};

  @keyframes up {
    0% {
      top: 50%;
      font-size: 0.75rem;
    }
    100% {
      top: 20%;
      font-size: 0.65rem;
    }
  }

  @keyframes upReverse {
    0% {
      top: 20%;
      font-size: 0.5rem;
    }
    100% {
      top: 40%;
      font-size: 0.75rem;
    }
  }
`;

const underline = css`
  @keyframes underline {
    0% {
      right: 100%;
      left: 0;
    }
    100% {
      left: 0;
      right: 0%;
    }
  }

  @keyframes underlineFill {
    0% {
      left: 0;
      right: 0%;
    }
    100% {
      right: 0%;
      left: 100%;
    }
  }
`;

const shake = css`
  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    50% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    100% {
      transform: translate(1px, 1px) rotate(0deg);
    }
  }
`;

const animations = {
  easeOpenClose,
  easeOpacity,
  easeShow,
  upLabel,
  underline,
  shake
};

export default animations;
