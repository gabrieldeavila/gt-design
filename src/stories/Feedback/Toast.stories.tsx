/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from "react";
import { Button, Space } from "../../components";
import SectionContainer from "../../components/Text/Template/SectionContainer";
import { useGTToastContext } from "../../context/Toast/Toast";
import { GTBasic } from "../../gt";

export default {
  title: "Feedback/Toast",
};

const Template = () => {
  return (
    <GTBasic>
      <ToastContent />
    </GTBasic>
  );
};

const ToastContent = () => {
  const { toast } = useGTToastContext();

  return (
    <Space.Horizontal>
      <SectionContainer title="Toast" subtitle="STORIES.TOAST.SUBTITLE" />
      <Button.Wrapper>
        <Button.Contrast
          // @ts-expect-error
          onClick={() => toast("Hello World", { type: "warning" })}
          content="Warning"
          title="EXAMPLE.CLICK_ME"
        />
        <Button.Error
          // @ts-expect-error
          onClick={() => toast("Hello World", { type: "error" })}
          content="Error"
          title="EXAMPLE.CLICK_ME"
        />
        <Button.Normal
          // @ts-expect-error
          onClick={() => toast("Hello World", { type: "info" })}
          content="Info"
          title="EXAMPLE.CLICK_ME"
        />
        <Button.Success
          // @ts-expect-error
          onClick={() => toast("Hello World", { type: "success" })}
          content="Success"
          title="EXAMPLE.CLICK_ME"
        />
      </Button.Wrapper>
    </Space.Horizontal>
  );
};

export const Toast = Template.bind({});
