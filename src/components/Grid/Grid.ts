import styled from "styled-components";

const GridForm = styled.form`
  width: -webkit-fill-available;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20vw, 1vw));
  grid-gap: 1.75rem;
`;

const GridItem = styled.div`
  grid-row-start: 1;
  grid-row-end: 3;
`;

const Grid = {
  Form: GridForm,
  Item: GridItem,
};

export default Grid;
