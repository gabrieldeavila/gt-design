import PropTypes from "prop-types";
import React from "react";
import GTContainer from "../Container/Container";
import { IGTDesign } from "./interface";

function GTDesign({ children }: IGTDesign) {
  return <GTContainer.Default>{children}</GTContainer.Default>;
}

export default GTDesign;

GTDesign.propTypes = {
  theme: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  children: PropTypes.node.isRequired,
};
