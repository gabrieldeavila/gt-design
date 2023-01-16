/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useCallback, useRef, useState } from "react";
import { Button, Space } from "../components";
import { IModalData } from "../components/Modal/interface";
import GTModalBasic from "../components/Modal/Template/Basic";
import SectionContainer from "../components/Text/Template/SectionContainer";
import { GTBasic } from "../gt";
import { randomNumber } from "../utils";

export default {
  title: "Feedback/Modals/Basic",
};

const Template = () => {
  const [showModalBasic, setShowModalBasic] = useState(false);
  const modalData = useRef<IModalData>({
    title: "Modal Basic",
    content: "STORIES.MODAL_BASIC.CONTENT",
    orientationY: "center",
    orientationX: "center",
  });

  const handleBasicOpen = useCallback(() => {
    modalData.current = {
      title: "Modal Basic",
      content: "STORIES.MODAL_BASIC.CONTENT",
      orientationY: "center",
      orientationX: "center",
    };

    setShowModalBasic(true);
  }, []);

  const handleBasicTop = useCallback(() => {
    modalData.current = {
      title: "Modal Top",
      content: "STORIES.MODAL_BASIC.CONTENT",
      orientationY: "top",
      orientationX: "center",
    };

    setShowModalBasic(true);
  }, []);

  const handleBasicBottom = useCallback(() => {
    modalData.current = {
      content: "STORIES.MODAL_BASIC.CONTENT",
      title: "Modal Bottom",
      orientationY: "bottom",
      orientationX: "center",
    };

    setShowModalBasic(true);
  }, []);

  const handleBasicLeft = useCallback(() => {
    modalData.current = {
      content: "STORIES.MODAL_BASIC.CONTENT",
      title: "Modal Left",
      orientationX: "left",
    };

    setShowModalBasic(true);
  }, []);

  const handleBasicRight = useCallback(() => {
    modalData.current = {
      content: "STORIES.MODAL_BASIC.CONTENT",
      title: "Modal Right",
      orientationX: "right",
    };

    setShowModalBasic(true);
  }, []);

  const handleBasicTopRight = useCallback(() => {
    modalData.current = {
      content: "STORIES.MODAL_BASIC.CONTENT",
      title: "Modal Top Right",
      orientationY: "top",
      orientationX: "right",
    };

    setShowModalBasic(true);
  }, []);

  const handleBasicActions = useCallback(() => {
    modalData.current = {
      content: "STORIES.MODAL_BASIC.CONTENT",
      title: "Modal Actions",
      confirmText: "Confirm",
      cancelText: "Cancel",
      onCancel: () => {
        console.log(
          "wow this function should be called when cancel button clicked"
        );
      },
      onConfirm: () => {
        console.log(
          "wow this function should be called when confirm button clicked"
        );
      },
      onClose: () => {
        console.log("wow this function should be called when modal closed");
      },
    };

    setShowModalBasic(true);
  }, []);

  const handleBasicUnclosable = useCallback(() => {
    modalData.current = {
      content: "STORIES.MODAL_BASIC.UNCLOSEABLE",
      title: "Modal Unclosable",
      confirmText: "Confirm",
      closable: false,
    };

    setShowModalBasic(true);
  }, []);

  const handleBeforeConfirm = useCallback(() => {
    modalData.current = {
      content: "STORIES.MODAL_BASIC.BEFORE_CONFIRM",
      title: "Modal OnBeforeConfirm",
      confirmText: "Confirm",
      onBeforeConfirm: async () => {
        return await new Promise((resolve) => {
          setTimeout(() => {
            const random = randomNumber(0, 1) ?? 0;

            resolve(!!random);
          }, 2000);
        });
      },
    };

    setShowModalBasic(true);
  }, []);

  const handleBeforeCancel = useCallback(() => {
    modalData.current = {
      content: "STORIES.MODAL_BASIC.BEFORE_CANCEL",
      title: "Modal OnBeforeCancel",
      cancelText: "Cancel",
      onBeforeCancel: async () => {
        return await new Promise((resolve) => {
          setTimeout(() => {
            const random = randomNumber(0, 1) ?? 0;

            resolve(!!random);
          }, 2000);
        });
      },
    };

    setShowModalBasic(true);
  }, []);

  return (
    <GTBasic>
      <Space.Horizontal>
        <SectionContainer
          title="Modal Basic"
          subtitle="STORIES.MODAL_BASIC.SUBTITLE"
        />
        <Space.Modifiers addOns={["middle"]}>
          <Space.Modifiers addOns={["middle", "px-5", "gap-2", "flex-wrap"]}>
            <Button.Normal fitContent onClick={handleBasicOpen}>
              Modal Basic
            </Button.Normal>

            <Button.Normal fitContent onClick={handleBasicTop}>
              Modal Top
            </Button.Normal>

            <Button.Normal fitContent onClick={handleBasicBottom}>
              Modal Bottom
            </Button.Normal>

            <Button.Normal fitContent onClick={handleBasicLeft}>
              Modal Left
            </Button.Normal>

            <Button.Normal fitContent onClick={handleBasicRight}>
              Modal Right
            </Button.Normal>

            <Button.Normal fitContent onClick={handleBasicTopRight}>
              Modal Top Right
            </Button.Normal>

            <Button.Normal fitContent onClick={handleBasicActions}>
              Modal Actions
            </Button.Normal>

            <Button.Normal fitContent onClick={handleBasicUnclosable}>
              Modal Unclosable
            </Button.Normal>

            <Button.Normal fitContent onClick={handleBeforeConfirm}>
              Modal onBeforeConfirm
            </Button.Normal>

            <Button.Normal fitContent onClick={handleBeforeCancel}>
              Modal onBeforeCancel
            </Button.Normal>
          </Space.Modifiers>
        </Space.Modifiers>
      </Space.Horizontal>

      <GTModalBasic
        data={modalData.current}
        show={showModalBasic}
        setShow={setShowModalBasic}
      />
    </GTBasic>
  );
};

export const Basic = Template.bind({});
