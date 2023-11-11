import styled from "styled-components";
import skeletons from "../../../../utils/skeletons";

const Wrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
`;

const Header = styled.div`
  position: relative;
  border-radius: 0.25rem;
  height: 100px;
  overflow: hidden;

  ${skeletons.after};
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

  ${skeletons.after};
  cursor: wait;
`;

const CanarySty = {
  Wrapper,
  Header,
  Blocks,
  Block,
};

export default CanarySty;
