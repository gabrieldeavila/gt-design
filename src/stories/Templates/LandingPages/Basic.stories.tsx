import React from "react";
import { Clock, Edit3, Tool } from "react-feather";
import {
  Button,
  EasyState,
  GTInput,
  Input,
  Navbar,
  Space,
  Text,
} from "../../../components";
import {
  INonNumericMask,
  INumericMask,
} from "../../../components/Input/Fields/interface";
import { GTBasic } from "../../../gt";
import { GTBasicLandingPage } from "../../../gt/Template/LandingPage";
import {
  IGTLandingBenefit,
  IGTLandingFeature,
} from "../../../gt/Template/LandingPage/interface";

export default {
  title: "Templates/LandingPage/Basic",
};

const NavbarOptions = () => {
  return (
    <>
      <Navbar.Options>
        <Navbar.OptionWrapper>
          <Space.Modifiers gridGap="1rem">
            <Text.Action>Docs</Text.Action>
            <Text.Action>GitHub</Text.Action>
            <Text.Action>npm</Text.Action>
          </Space.Modifiers>
        </Navbar.OptionWrapper>

        <Navbar.OptionWrapper>
          <Space.Modifiers gridGap="1rem">
            <Button.Contrast
              defaultSize="sm"
              fitContent
              px="1.25rem"
              py="0.5rem"
              borderRadius="2rem"
            >
              Log in
            </Button.Contrast>
          </Space.Modifiers>
        </Navbar.OptionWrapper>
      </Navbar.Options>
    </>
  );
};

const Benefits: IGTLandingBenefit[] = [
  {
    title: "Save time",
    description:
      "By automating repetitive tasks, you can free up more time to focus on the creative aspects of your work",
    icon: <Clock />,
  },
  {
    title: "Improve efficiency",
    description:
      "Streamline workflow and reduce manual labor for faster, more accurate project completion without sacrificing quality.",
    icon: <Tool />,
  },
  {
    title: "Enhance outcomes",
    description:
      "From phone masking to email validation, we ensure that your applications look and function exactly as intended.",
    icon: <Edit3 />,
  },
];

const Features: IGTLandingFeature[] = [
  {
    title: "Save time",
    description:
      "With easy-to-use validation for emails, numbers, and more, you can ensure that your data is accurate and reliable.",
    component: <ExampleValidation />,
  },
  {
    title: "Global Reach with i18n",
    description:
      "GT Design includes i18n by default, ensuring that your application is fully localized and ready to use in any language.",
    component: <Clock />,
  },
  {
    title: "Masking by Default",
    description:
      "GT Design also includes powerful number masking tools for phone numbers and other numeric data, making it easy to display information in the format you want.",
    component: <ExampleMasking />,
  },
  {
    title: "Easy-to-style theme",
    description:
      "You can customize the look and feel of your application to match your brand and user preferences.",
    component: <Clock />,
  },
];

const Template = () => {
  return (
    <GTBasic>
      <GTBasicLandingPage
        logo="GT Design"
        options={NavbarOptions}
        title="GT Design"
        description="Design smarter, not harder"
        benefitDescription="A powerful tool for developers to streamline workflow, save time, and enhance design outcomes."
        benefits={Benefits}
        features={Features}
        footerDescription="Designed and built in sleepless nights by Gabriel Avila."
      />
    </GTBasic>
  );
};

export const Basic = Template.bind({});

function ExampleMasking() {
  const moneyMask: INumericMask = {
    suffix: "",
    prefix: "US$  ",
    thousandsSeparatorSymbol: ",",
    decimalSymbol: ".",
    decimalLimit: 2,
    integerLimit: 7,
    allowNegative: true,
    type: "numeric_mask",
    min: 50,
    max: 500,
  };

  const phoneMask: INonNumericMask = {
    options: ["(99) 9999-9999", "(999) 9999-9999"],
    type: "non_numeric_mask",
  };

  return (
    <EasyState name="example-masking" initial={{ price: 1 }}>
      <Input.Group>
        <GTInput.Mask
          title="As easy as it should be"
          name="phone"
          label="Phone"
          mask={phoneMask}
        />

        <GTInput.Mask
          title="As easy as it should be"
          name="price"
          label="Money"
          mask={moneyMask}
        />
      </Input.Group>
    </EasyState>
  );
}

function ExampleValidation() {
  return (
    <EasyState name="example-validation" initial={{ email: "" }}>
      <Input.Group>
        <GTInput.Email
          title="As easy as it should be"
          name="email"
          label="Email"
        />

        <GTInput.Text
          title="As easy as it should be"
          minChars="10"
          maxChars="20"
          minWords="2"
          maxWords="5"
          name="name"
          label="TEMPLATE.LOGIN.NAME_LABEL"
        />
      </Input.Group>
    </EasyState>
  );
}
