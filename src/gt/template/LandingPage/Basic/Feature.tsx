import React, { useMemo } from "react";
import LandingPage from "../LandingPage";
import { Text } from "../../../../components";
import { IFeature } from "../interface";
import useGTTranslate from "../../../Global/translate";
import useIsMobile from "../../../../hooks/helpers/useIsMobile";

function Feature(props: IFeature) {
  const isMobile = useIsMobile();
  const { title } = props;

  const { right, left } = useMemo(() => {
    if (title == null) {
      return {
        left: <FeatureComponent {...props} />,
        right: <FeatureBox {...props} />,
      };
    }

    if (props.orientation === "left" && !isMobile) {
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
  }, [isMobile, props, title]);

  return (
    <LandingPage.Features.Content>
      {title != null && (
        <LandingPage.Features.Left>{right}</LandingPage.Features.Left>
      )}
      <LandingPage.Features.Right>{left}</LandingPage.Features.Right>
    </LandingPage.Features.Content>
  );
}

export default Feature;

function FeatureBox({ title, description }: IFeature) {
  const { translateThis } = useGTTranslate();

  return (
    <>
      <Text.P textAlign="center" fontSize="1.5rem" fontWeight="400">
        {translateThis(title ?? "")}
      </Text.P>
      <Text.P textAlign="center">{translateThis(description ?? "")}</Text.P>
    </>
  );
}

function FeatureComponent({ component }: IFeature) {
  return <>{component}</>;
}
