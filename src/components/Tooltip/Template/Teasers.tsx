import React from "react";
import Polygon from "../../SVG/Polygon";
import Tooltip from "../Tooltip";

function TeaserTip() {
  return (
    <Tooltip.Wrapper>
      <Polygon />
      <Tooltip.Container>

        <Tooltip.Title> Teaser</Tooltip.Title>
        <Tooltip.Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          facilisi. Sed euismod, nisl vel tincidunt lacinia, nunc est
        </Tooltip.Text>
      </Tooltip.Container>
    </Tooltip.Wrapper >
  );
}

export default TeaserTip;
