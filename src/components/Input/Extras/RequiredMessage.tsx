import React, { useRef } from "react";

function RequiredMessage({ isRequired = false }: { isRequired?: boolean }) {
  const requiredRef = useRef<HTMLSpanElement>(null);

  if (!isRequired) return null;

  return (
    <>
      {" "}
      <span ref={requiredRef} className="text-danger ml-1">
        *
      </span>
    </>
  );
}

export default RequiredMessage;
