/* eslint-disable multiline-ternary */
/* eslint-disable object-curly-newline */
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Icon from "react-feather";
import useOnClickOutside from "../../../hooks/helpers/useOnClickOutside";
import Button from "../../Button";
import Space from "../../Space";
import Text from "../../Text";
import useGTTranslate from "../../../gt/Global/translate";
import Modal from "../Modal";
import { IGTModal } from "../interface";

function GTModalBasic({ show, setShow, data, children }: IGTModal) {
  const { translateThis } = useGTTranslate();

  const [isOpen, setIsOpen] = useState(true);
  const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);
  const [isLoadingCancel, setIsLoadingCancel] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleCloseAnimation = useCallback(() => {
    setIsOpen(false);

    setTimeout(() => {
      setShow(false);
      setIsOpen(true);
    }, 200);
  }, [setShow]);

  const handleClose = useCallback(
    (isComingFromHandlers?: boolean) => {
      const isLoading = isLoadingConfirm || isLoadingCancel;
      const isClosable =
        !(data.closable ?? true) && !(isComingFromHandlers ?? false);

      if (isClosable || isLoading) {
        return;
      }

      handleCloseAnimation();

      data.onClose?.();
    },
    [data, handleCloseAnimation, isLoadingCancel, isLoadingConfirm]
  );

  useOnClickOutside(ref, null, () => handleClose());

  const handleCancel = useCallback(async () => {
    const isComingFromHandlers = true;
    setIsLoadingCancel(true);
    const canClose = await data.onBeforeCancel?.();

    if (canClose ?? true) {
      handleClose(isComingFromHandlers);
      data.onCancel?.();
    }

    setIsLoadingCancel(false);
  }, [data, handleClose]);

  const handleConfirm = useCallback(async () => {
    const isComingFromHandlers = true;
    setIsLoadingConfirm(true);
    const canClose = await data.onBeforeConfirm?.();

    if (canClose ?? true) {
      handleClose(isComingFromHandlers);
      data.onConfirm?.();
    }

    setIsLoadingConfirm(false);
  }, [data, handleClose]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    },
    [handleClose]
  );

  // removes scrolls from body when modal is open
  useEffect(() => {
    if (typeof window === "undefined") return;

    // verifies if there is a scrollbar
    const hasScrollbar = document.body.scrollHeight > window.innerHeight;
    if (!hasScrollbar) return;

    if (show) {
      document.body.style.overflow = "hidden";
      // add in px to avoid scroll jump
      document.body.style.paddingRight = "0.5rem";
    } else {
      document.body.style.overflow = "unset";
      // remove in px to avoid scroll jump
      document.body.style.paddingRight = "0px";
    }
  }, [show]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);

  if (!show) return null;

  return (
    <Modal.Content
      isOpen={isOpen}
      currOrientationX={data.orientationX}
      currOrientationY={data.orientationY}
    >
      <Modal.Wrapper ref={ref} isOpen={isOpen}>
        <Modal.Header>
          <Text.H1>{translateThis(data.title)}</Text.H1>
          {(data.closable ?? true) && (
            <Modal.Close onClick={() => handleClose()}>
              <Icon.X />
            </Modal.Close>
          )}
        </Modal.Header>

        <Modal.Main>
          <Modal.MainWrapper>
            {data.content == null ? (
              children
            ) : (
              <Text.P>{translateThis(data.content)}</Text.P>
            )}
          </Modal.MainWrapper>
        </Modal.Main>

        {(data.cancelText != null || data.confirmText != null) && (
          <Modal.Footer>
            <Space.Modifiers justifyContent="flex-end" gridGap="1rem">
              {data.cancelText != null && (
                <Button.Error
                  isLoading={isLoadingCancel}
                  fitContent
                  defaultSize="sm"
                  onClick={handleCancel}
                >
                  {translateThis(data.cancelText)}
                </Button.Error>
              )}

              {data.confirmText != null && (
                <Button.Success
                  isLoading={isLoadingConfirm}
                  fitContent
                  defaultSize="sm"
                  onClick={handleConfirm}
                >
                  {translateThis(data.confirmText)}
                </Button.Success>
              )}
            </Space.Modifiers>
          </Modal.Footer>
        )}
      </Modal.Wrapper>
    </Modal.Content>
  );
}

export default GTModalBasic;

GTModalBasic.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};
