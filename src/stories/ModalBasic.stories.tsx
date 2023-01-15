import React, { useCallback, useRef, useState } from "react";
import { Button, Space } from "../components";
import { IModalData } from "../components/Modal/interface";
import GTModalBasic from "../components/Modal/Template/Basic";
import SectionContainer from "../components/Text/Template/SectionContainer";
import { GTBasic } from "../gt";

export default {
  title: "Feedback/Modals/Basic",
};

const Template = () => {
  const [showModalBasic, setShowModalBasic] = useState(false);
  const modalData = useRef<IModalData>({
    title: "Modal Basic",
    content: "MODAL.CONTENT",
    orientationY: "center",
    orientationX: "center",
  });

  const handleBasicOpen = useCallback(() => {
    modalData.current = {
      title: "Modal Basic",
      content: "MODAL.CONTENT",
      orientationY: "center",
      orientationX: "center",
    };

    setShowModalBasic(true);
  }, []);

  const handleBasicTop = useCallback(() => {
    modalData.current = {
      title: "Modal Top",
      content: "MODAL.CONTENT",
      orientationY: "top",
      orientationX: "center",
    };

    setShowModalBasic(true);
  }, []);

  const handleBasicBottom = useCallback(() => {
    modalData.current = {
      content: "MODAL.CONTENT",
      title: "Modal Bottom",
      orientationY: "bottom",
      orientationX: "center",
    };

    setShowModalBasic(true);
  }, []);

  const handleBasicLeft = useCallback(() => {
    modalData.current = {
      content: "MODAL.CONTENT",
      title: "Modal Left",
      orientationX: "left",
    };

    setShowModalBasic(true);
  }, []);

  const handleBasicRight = useCallback(() => {
    modalData.current = {
      content: "MODAL.CONTENT",
      title: "Modal Right",
      orientationX: "right",
    };

    setShowModalBasic(true);
  }, []);

  const handleBasicTopRight = useCallback(() => {
    modalData.current = {
      content: "MODAL.CONTENT",
      title: "Modal Top Right",
      orientationY: "top",
      orientationX: "right",
    };

    setShowModalBasic(true);
  }, []);

  const handleBasicConfirmBtn = useCallback(() => {
    modalData.current = {
      content: "MODAL.CONTENT",
      title: "Modal Top Right",
      confirmText: "Confirm",
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

            <Button.Normal fitContent onClick={handleBasicConfirmBtn}>
              Modal Confirm Button
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
