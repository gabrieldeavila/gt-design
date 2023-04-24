import React, { useMemo } from "react";
import LandingPage from "../LandingPage";
import { Text } from "../../../../components";
import { IFeature } from "../interface";
import useGTTranslate from "../../../Global/translate";

function Feature(props: IFeature) {
  const { right, left } = useMemo(() => {
    if (props.orientation === "left") {
      return {
        left: <FeatureBox {...props} />,
        right: <FeatureComponent {...props} />,
      };
    } else {
      return {
        left: <FeatureComponent {...props} />,
        right: <FeatureBox {...props} />,
      };
    }
  }, [props]);

  return (
    <LandingPage.Features.Content>
      <LandingPage.Features.Left>{right}</LandingPage.Features.Left>
      <LandingPage.Features.Right>{left}</LandingPage.Features.Right>
    </LandingPage.Features.Content>
  );
}

export default Feature;

function FeatureBox({ title, description }: IFeature) {
  const { translateThis } = useGTTranslate();

  return (
    <>
      <Text.P fontSize="1.5rem" fontWeight="400">
        {translateThis(title)}
      </Text.P>
      <Text.P>{translateThis(description)}</Text.P>
    </>
  );
}

function FeatureComponent({ component }: IFeature) {
  return <>{component}</>;
}
