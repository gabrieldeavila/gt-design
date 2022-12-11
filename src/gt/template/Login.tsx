/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Text } from "../../components";
import GTInput from "../../components/Input/GTInput";
import Input from "../../components/Input/Input";
import Login from "../../components/Login/Login";
import Space from "../../components/Space/Space";
import GTPageStateProvider, { useGTPageStateContext } from "../../context/pageState";
import { ILogin } from "./interface";

function GTLogin({ onPasswordForgot }: { onPasswordForgot: () => void; }) {
  const [pageState, setPageState] = useState({});
  const [errors, setErrors] = useState<string[]>([]);
  const [isCreate, setIsCreate] = useState(true);
  const heightRef = useRef<HTMLDivElement>(null);
  const canSave = useMemo(() => errors.length === 0, [errors]);

  return (
    <GTPageStateProvider
      pageState={pageState}
      setPageState={setPageState}
      errors={errors}
      setErrors={setErrors}
    >
      <Login.Wrapper>
        <Login.BoxContrast />
        <Login.BoxPrimary height={heightRef.current?.clientHeight ?? 0} />

        {isCreate
          ? (
            <LoginCreate onPasswordForgot={onPasswordForgot} loginRef={heightRef} setIsCreate={setIsCreate} canSave={canSave} />
            )
          : (
            <LoginSignIn onPasswordForgot={onPasswordForgot} loginRef={heightRef} setIsCreate={setIsCreate} canSave={canSave} />
            )}
      </Login.Wrapper>
    </GTPageStateProvider>
  );
}

export default GTLogin;

function LoginCreate({ setIsCreate, canSave, loginRef }: ILogin) {
  const { t } = useTranslation();

  return (
    <Login.BoxMain ref={loginRef}>
      <Login.BoxWrapper>
        <Space.Flex>
          <Text.H1>{t("TEMPLATE.LOGIN.CREATE_TITLE")}</Text.H1>
          <Text.P>{t("TEMPLATE.LOGIN.CREATE_SUBTITLE")}</Text.P>
        </Space.Flex>
        <Space.FullSpace>
          <Input.Wrapper>
            <GTInput.Text
              minChars="10"
              maxChars="20"
              minWords="2"
              maxWords="5"
              name="name"
              label="TEMPLATE.LOGIN.NAME_LABEL"
            />

            <GTInput.Text
              defaultValidation
              validations={["noSpaces"]}
              name="nickname"
              label="TEMPLATE.LOGIN.NICKNAME_LABEL"
            />

            <GTInput.Email name="email" label="TEMPLATE.LOGIN.EMAIL_LABEL" />

            <GTInput.Password name="password" label="TEMPLATE.LOGIN.PASSWORD_LABEL" />

            <GTInput.Password sameAs="password" name="confirm_password" label="TEMPLATE.LOGIN.CONFIRM_PASSWORD_LABEL" />
          </Input.Wrapper>
        </Space.FullSpace>
        <Space.Flex>
          <Text.P sm>
            {t("TEMPLATE.LOGIN.DATA_POLICY")}
          </Text.P>
          <Space.FullSpace>
            <Button.NormalShadow disabled={!canSave}>{t("TEMPLATE.LOGIN.CREATE_BUTTON")}</Button.NormalShadow>
          </Space.FullSpace>

          <Space.Center>
            <Text.Btn onClick={() => setIsCreate(false)}>
              {t("TEMPLATE.LOGIN.ALREADY_HAVE_ACCOUNT")}
            </Text.Btn>
          </Space.Center>
        </Space.Flex>
      </Login.BoxWrapper>
    </Login.BoxMain>
  );
}

LoginCreate.propTypes = {
  canSave: PropTypes.bool,
  setIsCreate: PropTypes.func,
  loginRef: PropTypes.object.isRequired
};

LoginCreate.defaultProps = {
  canSave: false,
  setIsCreate: () => { }
};

const signInFields = ["password", "nickname"];
function LoginSignIn({ canSave, setIsCreate, loginRef, onPasswordForgot }: ILogin) {
  const { t } = useTranslation();

  const { setErrors, pageState } = useGTPageStateContext();

  useEffect(() => {
    setErrors((prevErr) => {
      const newErr = prevErr.filter((err) => signInFields.includes(err));
      return newErr;
    });
  }, [setErrors]);

  const handleSignIn = useCallback(() => {
    console.log(pageState, "handleSignIn");
  }, [pageState]);

  return (
    <Login.BoxMain ref={loginRef}>
      <Login.BoxWrapper>
        <Space.Flex>
          <Text.H1>{t("TEMPLATE.LOGIN.SIGN_IN_TITLE")}</Text.H1>
          <Text.P>{t("TEMPLATE.LOGIN.SIGN_IN_SUBTITLE")}</Text.P>
        </Space.Flex>
        <Space.FullSpace>
          <Input.Wrapper>
            <GTInput.Text
              defaultValidation
              validations={["noSpaces"]}
              name="nickname"
              label="TEMPLATE.LOGIN.NICKNAME_LABEL"
            />

            <GTInput.Password name="password" label="TEMPLATE.LOGIN.PASSWORD_LABEL" />
          </Input.Wrapper>
        </Space.FullSpace>
        <Space.Flex>
          <Space.FullSpace>
            <Button.NormalShadow onClick={handleSignIn} disabled={!canSave}>
              {t("TEMPLATE.LOGIN.SIGN_IN_BUTTON")}
            </Button.NormalShadow>
          </Space.FullSpace>

          <Space.Between>
            <Text.Btn onClick={() => setIsCreate(true)}>
              {t("TEMPLATE.LOGIN.DONT_HAVE_ACCOUNT")}
            </Text.Btn>
            <Text.Btn onClick={onPasswordForgot}>{t("TEMPLATE.LOGIN.FORGOT_PASSWORD")}</Text.Btn>
          </Space.Between>
        </Space.Flex>
      </Login.BoxWrapper>
    </Login.BoxMain>
  );
}

LoginSignIn.propTypes = {
  canSave: PropTypes.bool,
  setIsCreate: PropTypes.func,
  loginRef: PropTypes.object.isRequired
};

LoginSignIn.defaultProps = {
  canSave: false,
  setIsCreate: () => { }
};
