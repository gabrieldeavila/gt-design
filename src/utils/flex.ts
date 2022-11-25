import { css } from 'styled-components';

const alignCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const alignCenterCol = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const justifyBetween = css`
  display: flex;
  justify-content: space-between;
`;

const justifyEvenly = css`
  display: flex;
  justify-content: space-evenly;
`;

const wrapGap = css`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
`;

const column = css`
  display: flex;  
  flex-direction: column;
`;

const spaceBetween = css`
  display: flex;
  justify-content: space-between;
`;

const flex = {
  alignCenter,
  alignCenterCol,
  justifyBetween,
  spaceBetween,
  justifyEvenly,
  wrapGap,
  column
};

export default flex; 
