"use client";

import {
  EasyState,
  GTBasicLandingPage,
  GTInput,
  IGTLandingBenefit,
  IGTLandingFeature,
  IGTLandingNavbar,
  INonNumericMask,
  INumericMask,
  Input,
  SelectionOptions,
  autoUpdateTheme,
} from "@geavila/gt-design";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Clock, Edit3, Tool } from "react-feather";

export default function LandingPage({
  params: { lang },
}: {
  params: { lang: string | null };
}) {
  const router = useRouter();

  const navbarOptions: IGTLandingNavbar = {
    logo: "GT",
    button: {
      description: "TEMPLATE.LANDING_PAGE.LOG_IN",
      onClick: () => router.push(`${lang}/login`),
    },
    options: [
      {
        description: "Docs",
        onClick: () => window.open("https://example.com", "_blank"),
      },
      {
        description: "GitHub",
        onClick: () =>
          window.open("https://github.com/gabrieldeavila/gt-design", "_blank"),
      },
      {
        description: "npm",
        onClick: () =>
          window.open(
            "https://www.npmjs.com/package/@geavila/gt-design?activeTab=readme",
            "_blank"
          ),
      },
    ],
  };

  const callToAction = {
    title: "TEMPLATE.LANDING_PAGE.ACTION.TITLE",
    description: "TEMPLATE.LANDING_PAGE.ACTION.DESCRIPTION",
    button: {
      onClick: () => router.push(`${lang}/login`),
      title: "TEMPLATE.LANDING_PAGE.ACTION.GET_STARTED",
    },
  };
  return (
    <GTBasicLandingPage
      navbarOptions={navbarOptions}
      title="GT Design"
      description="TEMPLATE.LANDING_PAGE.DESCRIPTION"
      benefitDescription="TEMPLATE.LANDING_PAGE.BENEFITS.DESCRIPTION"
      benefits={Benefits}
      features={Features}
      callToAction={callToAction}
      footerDescription="TEMPLATE.LANDING_PAGE.FOOTER.DESCRIPTION"
    />
  );

  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session?.user?.email} <br />
  //       {/* <UserInformation data={session.user} /> */}
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   );
  // }
}

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
  const router = useRouter();

  const options = React.useMemo(
    () => [
      { value: "en", label: "🇺🇸 English" },
      { value: "pt-BR", label: "🇧🇷 Português" },
    ],
    []
  );

  const handleChangeLanguage = React.useCallback((option: SelectionOptions) => {
    router.push(`/${option.value}`);
  }, []);

  return (
    <Input.Group>
      <EasyState name="example-translations" initial={{ select: "" }}>
        <GTInput.Select
          label="TRANSLATE.LANGUAGE"
          name="select"
          options={options}
          onSelect={handleChangeLanguage}
        />
      </EasyState>
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
