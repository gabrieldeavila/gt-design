import React, { useRef } from "react";
import { Button, Login, Space, Text } from "../../../components";
import useGTTranslate from "../../Global/translate";
import { ILoginProvider } from "../interface";

function LoginProviders({
  hide = [],
  onGoogleClick = () => {},
  onGitHubClick = () => {},
}: ILoginProvider) {
  const heightRef = useRef<HTMLDivElement>(null);
  const { translateThis } = useGTTranslate();

  return (
    <Login.Wrapper>
      <Login.BoxContrast />
      <Login.BoxPrimary height={heightRef.current?.clientHeight ?? 0} />
      <Login.BoxMain
        top="35%"
        left="35%"
        height="30%"
        width="25vw"
        ref={heightRef}
        avoidMirror
      >
        <Login.BoxWrapper>
          <Space.Center flexDirection="column">
            <Text.H1 fontSize="2rem">
              {translateThis("TEMPLATE.LOGIN.WELCOME")}
            </Text.H1>
            <Text.P>{translateThis("TEMPLATE.LOGIN.PROVIDER")}</Text.P>
          </Space.Center>
          <Space.Flex>
            {!hide.includes("google") && (
              // TODO: Fix this error
              // @ts-expect-error
              <Button.Google onClick={onGoogleClick} />
            )}

            {!hide.includes("github") && (
              // @ts-expect-error
              <Button.GitHub onClick={onGitHubClick} />
            )}
          </Space.Flex>
        </Login.BoxWrapper>
      </Login.BoxMain>
    </Login.Wrapper>
  );
}

export default LoginProviders;
