import React from "react";
import { Clock, Edit3, Tool } from "react-feather";
import {
  Button,
  EasyState,
  GTInput,
  GTTranslate,
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
import { autoUpdateTheme } from "../../../utils/colors";
import useGTTranslate from "../../../gt/Global/translate";

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
              TEMPLATE.LANDING_PAGE.LOG_IN
            </Button.Contrast>
          </Space.Modifiers>
        </Navbar.OptionWrapper>
      </Navbar.Options>
    </>
  );
};
const Benefits: IGTLandingBenefit[] = [
  {
    title: "TEMPLATE.LANDING_PAGE.BENEFITS.SAVE_TIME.TITLE",
    description: "TEMPLATE.LANDING_PAGE.BENEFITS.SAVE_TIME.DESCRIPTION",
    icon: <Clock />,
  },
  {
    title: "TEMPLATE.LANDING_PAGE.BENEFITS.IMPROVE_EFFICIENCY.TITLE",
    description:
      "TEMPLATE.LANDING_PAGE.BENEFITS.IMPROVE_EFFICIENCY.DESCRIPTION",
    icon: <Tool />,
  },
  {
    title: "TEMPLATE.LANDING_PAGE.BENEFITS.ENHANCE_OUTCOMES.TITLE",
    description: "TEMPLATE.LANDING_PAGE.BENEFITS.ENHANCE_OUTCOMES.DESCRIPTION",
    icon: <Edit3 />,
  },
];

const Features: IGTLandingFeature[] = [
  {
    title: "TEMPLATE.LANDING_PAGE.FEATURES.SAVE_TIME.TITLE",
    description: "TEMPLATE.LANDING_PAGE.FEATURES.SAVE_TIME.DESCRIPTION",
    component: <ExampleValidation />,
  },
  {
    title: "TEMPLATE.LANDING_PAGE.FEATURES.GLOBAL_REACH.TITLE",
    description: "TEMPLATE.LANDING_PAGE.FEATURES.GLOBAL_REACH.DESCRIPTION",
    component: <ExampleI18n />,
  },
  {
    title: "TEMPLATE.LANDING_PAGE.FEATURES.MASKING_BY_DEFAULT.TITLE",
    description:
      "TEMPLATE.LANDING_PAGE.FEATURES.MASKING_BY_DEFAULT.DESCRIPTION",
    component: <ExampleMasking />,
  },
  {
    title: "TEMPLATE.LANDING_PAGE.FEATURES.EASY_TO_STYLE_THEME.TITLE",
    description:
      "TEMPLATE.LANDING_PAGE.FEATURES.EASY_TO_STYLE_THEME.DESCRIPTION",
    component: <ExampleTheming />,
  },
];

const Template = () => {
  return (
    <GTBasic>
      <GTBasicLandingPage
        logo="GT Design"
        options={NavbarOptions}
        title="GT Design"
        description="TEMPLATE.LANDING_PAGE.DESCRIPTION"
        benefitDescription="TEMPLATE.LANDING_PAGE.BENEFITS.DESCRIPTION"
        benefits={Benefits}
        features={Features}
        callToAction={<CallToAction />}
        footerDescription="TEMPLATE.LANDING_PAGE.FOOTER.DESCRIPTION"
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
          title="EXAMPLE.EASY_AS_SHOULD"
          name="phone"
          label="EXAMPLE.PHONE"
          mask={phoneMask}
        />

        <GTInput.Mask
          title="EXAMPLE.EASY_AS_SHOULD"
          name="price"
          label="EXAMPLE.MONEY"
          mask={moneyMask}
        />
      </Input.Group>
    </EasyState>
  );
}

function ExampleI18n() {
  const options = React.useMemo(
    () => [
      { value: "en", label: "🇺🇸 English" },
      { value: "pt-BR", label: "🇧🇷 Português" },
    ],
    []
  );

  return (
    <Input.Group>
      <GTTranslate options={options} />
    </Input.Group>
  );
}

function ExampleValidation() {
  return (
    <EasyState name="example-validation" initial={{ email: "" }}>
      <Input.Group>
        <GTInput.Email
          title="EXAMPLE.EASY_AS_SHOULD"
          name="email"
          label="Email"
        />

        <GTInput.Text
          title="EXAMPLE.EASY_AS_SHOULD"
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

function ExampleTheming() {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
      autoUpdateTheme({
        keyToUpdate: name,
        newColor: e.target.value,
      });
    },
    []
  );

  return (
    <EasyState name="example-theming" initial={{ email: "" }}>
      <Input.Group>
        <GTInput.Color name="primary" label="Primary" onChange={handleChange} />

        <GTInput.Color
          name="secondary"
          label="Secondary"
          onChange={handleChange}
        />
      </Input.Group>
    </EasyState>
  );
}

function CallToAction() {
  const { translateThis } = useGTTranslate();

  return (
    <Space.Center flexDirection="column" gridGap="1rem">
      <Text.H2
        fontWeight="400"
        fontSize="1.4rem"
        color="var(--contrast)"
        backgroundImage="none"
        textAlign="center"
      >
        {translateThis("TEMPLATE.LANDING_PAGE.ACTION.TITLE")}
      </Text.H2>
      <Text.P>
        {translateThis("TEMPLATE.LANDING_PAGE.ACTION.DESCRIPTION")}
      </Text.P>
      <Button.Contrast
        fitContent
        fontSize="1rem"
        px="1.25rem"
        py="0.75rem"
        borderRadius="2rem"
      >
        {translateThis("TEMPLATE.LANDING_PAGE.ACTION.GET_STARTED")}
      </Button.Contrast>
    </Space.Center>
  );
}
