import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";
import { ITextBtn } from "../interface";
import { TextBtnStyled } from "../Text";

function TextBtn({
  children,
  onClick,
  className,
  style,
  disabled,
  type,
}: ITextBtn) {
  const [isFirstRender, setIsFirstRender] = useState(true);

  // avoid animation on first render
  const handleRender = useCallback(() => {
    setIsFirstRender(false);
  }, []);

  return (
    <TextBtnStyled
      type={type}
      onClick={onClick}
      className={className}
      style={style}
      disabled={disabled}
      isFirstRender={isFirstRender}
      onMouseEnter={handleRender}
    >
      {children}
    </TextBtnStyled>
  );
}

TextBtn.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

TextBtn.defaultProps = {
  onClick: () => {},
  className: "",
  style: {},
  disabled: false,
  type: "button",
};

export default TextBtn;
