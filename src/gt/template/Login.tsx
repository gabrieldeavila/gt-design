/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import PropTypes from "prop-types";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, Text } from "../../components";
import GTInput from "../../components/Input/GTInput";
import Input from "../../components/Input/Input";
import Login from "../../components/Login/Login";
import Space from "../../components/Space/Space";
import GTPageStateProvider, {
  useGTPageStateContext,
} from "../../context/pageState";
import useGTTranslate from "../Global/translate";
import { ILogin } from "./interface";

const GTLogin = memo(function GTLogin({
  onPasswordForgot,
}: {
  onPasswordForgot: () => void;
}) {
  const [pageState, setPageState] = useState({});
  const [errors, setErrors] = useState<string[]>([]);
  const [isCreate, setIsCreate] = useState(true);
  const heightRef = useRef<HTMLDivElement>(null);
  const canSave = useMemo(() => errors.length === 0, [errors]);

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender && !isCreate) {
      setIsFirstRender(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreate]);

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

        {isCreate ? (
          <LoginCreateMemo
            onPasswordForgot={onPasswordForgot}
            loginRef={heightRef}
            setIsCreate={setIsCreate}
            canSave={canSave}
            isFirstRender={isFirstRender}
          />
        ) : (
          <LoginSignInMemo
            onPasswordForgot={onPasswordForgot}
            loginRef={heightRef}
            setIsCreate={setIsCreate}
            canSave={canSave}
          />
        )}
      </Login.Wrapper>
    </GTPageStateProvider>
  );
});

export default GTLogin;

function LoginCreate({
  setIsCreate,
  canSave,
  loginRef,
  isFirstRender,
}: ILogin) {
  const { translateThis } = useGTTranslate();

  return (
    <Login.BoxMain ref={loginRef} isFirstRender={isFirstRender}>
      <Login.BoxWrapper>
        <Space.Flex>
          <Text.H1>{translateThis("TEMPLATE.LOGIN.CREATE_TITLE")}</Text.H1>
          <Text.P>{translateThis("TEMPLATE.LOGIN.CREATE_SUBTITLE")}</Text.P>
        </Space.Flex>
        <Input.Group>
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

          <GTInput.Password
            name="password"
            label="TEMPLATE.LOGIN.PASSWORD_LABEL"
          />

          <GTInput.Password
            sameAs="password"
            name="confirm_password"
            label="TEMPLATE.LOGIN.CONFIRM_PASSWORD_LABEL"
          />
        </Input.Group>
        <Space.Flex>
          <Text.P fontSize={0}>
            {translateThis("TEMPLATE.LOGIN.DATA_POLICY")}
          </Text.P>
          <Button.Normal disabled={!canSave}>
            {translateThis("TEMPLATE.LOGIN.CREATE_BUTTON")}
          </Button.Normal>

          <Space.Center>
            <Text.Btn onClick={() => setIsCreate(false)}>
              {translateThis("TEMPLATE.LOGIN.ALREADY_HAVE_ACCOUNT")}
            </Text.Btn>
          </Space.Center>
        </Space.Flex>
      </Login.BoxWrapper>
    </Login.BoxMain>
  );
}

const LoginCreateMemo = memo(LoginCreate);

LoginCreate.propTypes = {
  canSave: PropTypes.bool,
  setIsCreate: PropTypes.func,
  loginRef: PropTypes.object.isRequired,
};

const signInFields = ["password", "nickname"];

function LoginSignIn({
  canSave,
  setIsCreate,
  loginRef,
  onPasswordForgot,
}: ILogin) {
  const { translateThis } = useGTTranslate();

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
          <Text.H1>{translateThis("TEMPLATE.LOGIN.SIGN_IN_TITLE")}</Text.H1>
          <Text.P>{translateThis("TEMPLATE.LOGIN.SIGN_IN_SUBTITLE")}</Text.P>
        </Space.Flex>
        <Space.Flex>
          <Input.Group>
            <GTInput.Text
              defaultValidation
              validations={["noSpaces"]}
              name="nickname"
              label="TEMPLATE.LOGIN.NICKNAME_LABEL"
            />

            <GTInput.Password
              name="password"
              label="TEMPLATE.LOGIN.PASSWORD_LABEL"
            />
          </Input.Group>
        </Space.Flex>
        <Space.Flex>
          <Button.Normal onClick={handleSignIn} disabled={!canSave}>
            {translateThis("TEMPLATE.LOGIN.SIGN_IN_BUTTON")}
          </Button.Normal>

          <Space.Between>
            <Text.Btn onClick={() => setIsCreate(true)}>
              {translateThis("TEMPLATE.LOGIN.DONT_HAVE_ACCOUNT")}
            </Text.Btn>
            <Text.Btn onClick={onPasswordForgot}>
              {translateThis("TEMPLATE.LOGIN.FORGOT_PASSWORD")}
            </Text.Btn>
          </Space.Between>
        </Space.Flex>
      </Login.BoxWrapper>
    </Login.BoxMain>
  );
}

const LoginSignInMemo = memo(LoginSignIn);

LoginSignIn.propTypes = {
  canSave: PropTypes.bool,
  setIsCreate: PropTypes.func,
  loginRef: PropTypes.object.isRequired,
};
