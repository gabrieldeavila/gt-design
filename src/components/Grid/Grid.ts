import styled from "styled-components";
import { IGridItem } from "./interface";

const handleCol = (col: number | string | undefined, isMobile?: boolean) => {
  if (col == null) return 1;

  // when is mobile, there are only 3 cols
  const colLength = isMobile ?? false ? 3 : 12;

  const colNumber = Number(col);

  if (colNumber / colLength === 1) return colLength;

  if (colNumber > colLength) {
    const diff = colNumber % colLength;
    if (diff === 0) return colLength;

    return (colNumber % colLength) + 1;
  }

  return colNumber;
};

const GridForm = styled.form`
  width: -webkit-fill-available;

  /* create a grid display with max 12 cols */
  display: grid;
  grid-gap: 1.5rem 1rem;
  grid-template-columns: repeat(12, 12fr);

  /* when it's mobile */
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 3fr);
  }
`;

const GridItem = styled.div<IGridItem>`
  /* if it's bigger than 12, like 13, make it 1 */
  grid-column: span ${({ col }) => handleCol(col)};

  /* when is mobile */
  @media (max-width: 768px) {
    grid-column: span
      ${({ col, mobileCol }) => handleCol(mobileCol ?? col, true)};
  }
`;

const Grid = {
  Form: GridForm,
  Item: GridItem,
};

export default Grid;
