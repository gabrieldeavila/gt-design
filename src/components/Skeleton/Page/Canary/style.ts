import styled from "styled-components";
import skeletons from "../../../../utils/skeletons";

const Wrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 1.5rem;
  width: calc(100vw - 3rem);
  height: calc(100vh - 3rem);
  flex-direction: column;
`;

const Header = styled.div`
  position: relative;
  border-radius: 0.25rem;
  height: 100px;
  overflow: hidden;

  ${skeletons.highContrast};
  cursor: wait;
`;

const Blocks = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  flex-grow: 1;
`;

const Block = styled.div`
  height: 10px;
  border-radius: 2.5px;
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;

  ${skeletons.highContrast};
  cursor: wait;
`;

const CanarySty = {
  Wrapper,
  Header,
  Blocks,
  Block,
};

export default CanarySty;
