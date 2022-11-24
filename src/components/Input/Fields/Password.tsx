/* eslint-disable operator-linebreak */
import PropTypes from 'prop-types';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import * as Icon from 'react-feather';
import { useTranslation } from 'react-i18next';
import useInputValues from '../../../hooks/pageState/useInputValues';
import useValidatePassword from '../../../hooks/validation/useValidatePassword';
import useValidateState from '../../../hooks/validation/useValidateState';
import Input from '../Input';
import { IGTInput } from './interface';

const defaultValidationObj = [
    'eightLong',
    'oneSpecial',
    'oneLowercase',
    'oneNumber',
    'oneUppercase'
];

function GTInputPassword({ name, label, defaultValidation, validations, onChange }: IGTInput) {
    const { t } = useTranslation()

    const inputValidations = useMemo(() => {
        if (defaultValidation) {
            return [...defaultValidationObj, ...validations];
        }

        return validations;
    }, [defaultValidation, validations]);

    const { validateState } = useValidateState(name, inputValidations);

    const { labelIsUp, value, handleInputChange, handleInputBlur, handleInputFocus } =
        useInputValues(name);

    const { validatePassword } = useValidatePassword();
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const type = useMemo(() => (showPassword ? 'text' : 'password'), [showPassword]);

    useEffect(() => {
        if (!value) return;

        const { isValid, invalidMessage } = validatePassword(value, inputValidations);

        setIsValidPassword(isValid);
        setErrorMessage(invalidMessage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleShowPassword = useCallback(() => {
        setShowPassword((prevState) => !prevState);
    }, []);

    const handleBlur = useCallback(() => {
        handleInputBlur();
    }, [handleInputBlur]);

    const handleChange = useCallback(
        (e: any) => {
            const { value: pswVal } = e.target;
            const { isValid, invalidMessage } = validatePassword(pswVal, inputValidations);

            validateState(isValid, pswVal);
            setIsValidPassword(isValid);
            setErrorMessage(invalidMessage);
            handleInputChange(pswVal);

            onChange(e);
        },
        [handleInputChange, inputValidations, onChange, validatePassword, validateState]
    );

    return (
        <Input.Container>
            <Input.Label up={labelIsUp} htmlFor={name}>
                {label}
            </Input.Label>
            <Input.Field
                type={type}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                onFocus={handleInputFocus}
                id={name}
                name={name}
            />

            {showPassword ? (
                <Icon.Eye onClick={handleShowPassword} />
            ) : (
                <Icon.EyeOff onClick={handleShowPassword} />
            )}

            {!isValidPassword && <Input.Error>{t(`PASSWORD.${errorMessage}`)}</Input.Error>}
        </Input.Container>
    );
}

export default GTInputPassword;

GTInputPassword.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    validations: PropTypes.arrayOf(PropTypes.string),
    defaultValidation: PropTypes.bool,
    onChange: PropTypes.func
};

GTInputPassword.defaultProps = {
    validations: defaultValidationObj,
    defaultValidation: true,
    onChange: () => { }
};
