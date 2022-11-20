import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import GTBasic from "../../gt/Template/Basic";
import LoginEx from "../../gt/Template/Login";
import MotionBox from "../Motion/motionBox";


function LoginStory() {
    return (
        <GTBasic>
            <LoginEx />
        </GTBasic>
    );
}

export default {
    title: "GTDesign/Login",
    component: LoginStory,
}

const Template: ComponentStory<typeof LoginStory> = (args) => <LoginStory />;

export const GTBox = Template.bind({});
