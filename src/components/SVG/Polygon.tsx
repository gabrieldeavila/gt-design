import React from "react";

function Polygon({ top }: { top: number; }) {
  return (
    <div className="svg-polygon-container">
      <svg style={{ top }} className="svg-polygon svg-no-active" width="25" height="25" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="polygon-path" d="M64.134 0.500005C64.5189 -0.166661 65.4811 -0.166667 65.866 0.5L129.086 110C129.471 110.667 128.99 111.5 128.22 111.5H1.78015C1.01035 111.5 0.529221 110.667 0.914121 110L64.134 0.500005Z" fill="#D9D9D9" />
      </svg>
    </div>
  );
}

export default Polygon;
