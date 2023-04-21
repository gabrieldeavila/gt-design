import React from "react";
import { Space, Text } from "../../../../components";
import LandingPage from "../LandingPage";
import BasicNavbar from "./BasicNavbar";
import { Clock, Edit3, Tool } from "react-feather";
import Benefit from "./Benefit";

function GTBasicLandingPage() {
  return (
    <>
      <BasicNavbar />
      <LandingPage.Wrapper>
        <LandingPage.Header>
          <Text.Title>GT Design</Text.Title>
          <Text.Subtitle>Design smarter, not harder</Text.Subtitle>
        </LandingPage.Header>

        <LandingPage.Benefits.Wrapper>
          <LandingPage.Benefits.Content>
            <Space.Modifiers maxWidth="30rem">
              <Text.H2
                fontWeight="400"
                fontSize="1.4rem"
                color="var(--contrast)"
                backgroundImage="none"
                textAlign="center"
              >
                A powerful tool for developers to streamline workflow,
                save time, and enhance design outcomes.
              </Text.H2>
            </Space.Modifiers>

            <Space.Center alignItems="flex-start" gridGap="2rem">
              <Benefit
                title="Save time"
                description="By automating repetitive tasks, you can free up more time to focus on the creative aspects of your work"
                icon={<Clock />}
              />

              <Benefit
                title="Improve efficiency"
                description="Streamline workflow and reduce manual labor for faster, more accurate project completion without sacrificing quality."
                icon={<Tool />}
              />

              <Benefit
                title="Enhance outcomes"
                description="From phone masking to email validation, we ensure that your applications look and function exactly as intended."
                icon={<Edit3 />}
              />
            </Space.Center>
          </LandingPage.Benefits.Content>
        </LandingPage.Benefits.Wrapper>
      </LandingPage.Wrapper>
    </>
  );
}

export default GTBasicLandingPage;
