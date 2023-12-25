/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useMemo, useRef } from "react";
import Options from "../../../../components/Popup/Custom/Options/Options";
import { GTBasic } from "../../../../gt";
import { Space } from "../../../../components";
import { IOptionsItems } from "../../../../components/Popup/Custom/Options/interface";

export default {
  title: "Feedback/Popup/Options",
};

const Template = () => {
  const popupRef = useRef<HTMLButtonElement>(null);

  const optionsItems = useMemo<IOptionsItems[]>(
    () => [
      {
        name: "Option 1",
        value: 1,
        onClick: () => {
          console.log("Option 1");
        },
      },
      {
        name: "Option 2",
        value: 2,
        onClick: () => {
          console.log("Option 2");
        },
      },
      {
        name: "Option 3",
        value: 3,
        onClick: () => {
          console.log("Option 3");
        },
      },
    ],
    []
  );

  return (
    <GTBasic>
      <Space.Center pt="10px">
        <button
          style={{
            background: "#fff",
            color: "#000",
          }}
          ref={popupRef}
        >
          Open Popup
        </button>

        <Options parentRef={popupRef} items={optionsItems} />
      </Space.Center>
    </GTBasic>
  );
};

export const Toast = Template.bind({});
