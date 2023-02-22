import styled from "styled-components";
import { IGridItem } from "./interface";

const handleCol = (col: number | string | undefined) => {
  if (col == null) return 1;

  const colNumber = Number(col);
  if (colNumber > 12) return colNumber % 12;

  return colNumber;
};

const GridForm = styled.form`
  width: -webkit-fill-available;

  /* create a grid display with max 12 cols */
  display: grid;
  grid-gap: 1.5rem 1rem;
  grid-template-columns: repeat(12, calc(8.33vw - 1.25rem));
`;

const GridItem = styled.div<IGridItem>`
  /* if it's bigger than 12, like 13, make it 1 */
  grid-column: span ${({ col }) => handleCol(col)};
`;

const Grid = {
  Form: GridForm,
  Item: GridItem,
};

export default Grid;
