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
      top: 0%;
      font-size: 0.5rem;
    }
    100% {
      top: 40%;
      font-size: 0.75rem;
    }
  }
`;

const animations = {
  easeOpenClose,
  easeOpacity,
  easeShow,
  upLabel,
};

export default animations;
