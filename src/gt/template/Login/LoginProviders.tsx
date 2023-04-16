import React, { useEffect, useRef, useState } from "react";
import { Button, Login, Space, Text } from "../../../components";
import { ILogin } from "../interface";

function LoginProviders() {
  const heightRef = useRef<HTMLDivElement>(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isCreate, setIsCreate] = useState(true);

  useEffect(() => {
    if (isFirstRender && !isCreate) {
      setIsFirstRender(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreate]);

  return (
    <Login.Wrapper>
      <Login.BoxContrast />
      <Login.BoxPrimary height={heightRef.current?.clientHeight ?? 0} />
      <LoginCreate
        loginRef={heightRef}
        setIsCreate={setIsCreate}
        // canSave={canSave}
        canSave
        isFirstRender={isFirstRender}
      />
    </Login.Wrapper>
  );
}

export default LoginProviders;

function LoginCreate({
  setIsCreate,
  canSave,
  loginRef,
  isFirstRender,
}: ILogin) {
  return (
    <Login.BoxMain
      top="10%"
      left="36%"
      ref={loginRef}
      isFirstRender={isFirstRender}
    >
      <Login.BoxWrapper>
        <Text.H1 fontSize="2rem"></Text.H1>
        <Space.Flex>
          <Button.GitHub />
          <Button.Google />
        </Space.Flex>
      </Login.BoxWrapper>
    </Login.BoxMain>
  );
}
