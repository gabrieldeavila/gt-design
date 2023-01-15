/* eslint-disable object-curly-newline */
import PropTypes from "prop-types";
import React, { useCallback, useRef, useState } from "react";
import * as Icon from "react-feather";
import useOnClickOutside from "../../../hooks/helpers/useOnClickOutside";
import Button from "../../Button";
import Space from "../../Space";
import Text from "../../Text";
import { IGTModal } from "../interface";
import Modal from "../Modal";

function GTModalBasic({ show, setShow, data }: IGTModal) {
  const [isOpen, setIsOpen] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setShow(false);
      setIsOpen(true);
    }, 200);
  }, [setShow]);

  useOnClickOutside(ref, null, handleClose);

  if (!show) return null;

  return (
    <Modal.Content
      isOpen={isOpen}
      currOrientationX={data.orientationX}
      currOrientationY={data.orientationY}
    >
      <Modal.Wrapper ref={ref} isOpen={isOpen}>
        <Modal.Container>
          <Modal.Header>
            <Text.H1>{data.title}</Text.H1>
            <Modal.Close onClick={handleClose}>
              <Icon.X />
            </Modal.Close>
          </Modal.Header>

          <Modal.Main>
            <Text.P>{data.content}</Text.P>
          </Modal.Main>

          <Modal.Footer>
            <Space.Modifiers addOns={["flex-end", "gap-1"]}>
              <Button.Error fitContent size="sm" onClick={handleClose}>
                Close
              </Button.Error>

              <Button.Success fitContent size="sm" onClick={handleClose}>
                Confirm
              </Button.Success>
            </Space.Modifiers>
          </Modal.Footer>
        </Modal.Container>
      </Modal.Wrapper>
    </Modal.Content>
  );
}

export default GTModalBasic;

GTModalBasic.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};
