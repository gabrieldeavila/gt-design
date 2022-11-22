/* eslint-disable operator-linebreak */
import PropTypes from 'prop-types';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useInputValues from '../../../hooks/pageState/useInputValues';
import useValidateEmail from '../../../hooks/validation/useValidateEmail';
import useValidateState from '../../../hooks/validation/useValidateState';
import Input from '../Input';
import { IGTInput } from './interface';

const defaultValidationObj = ['required'];

function GTInputEmail({ name, label, validations, defaultValidation, onChange }: IGTInput) {
    const { t, i18n } = useTranslation();

    const inputValidations = useMemo(() => {
        if (defaultValidation) {
            return [...defaultValidationObj, ...validations];
        }

        return validations;
    }, [defaultValidation, validations]);

    const { validateState } = useValidateState(name, inputValidations);

    const { labelIsUp, value, handleInputChange, handleInputBlur, handleInputFocus } =
        useInputValues(name);

    const { validateEmail } = useValidateEmail();
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!value) return;

        const { isValid, invalidMessage } = validateEmail(value, inputValidations);
        console.log(isValid, invalidMessage);
        setIsValidEmail(isValid);
        setErrorMessage(invalidMessage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = useCallback(
        (e: any) => {
            const { value: emailVal } = e.target;
            const { isValid, invalidMessage } = validateEmail(emailVal, inputValidations);

            validateState(isValid, emailVal);
            setIsValidEmail(isValid);
            setErrorMessage(invalidMessage);
            handleInputChange(emailVal);

            onChange(e);
        },
        [validateEmail, inputValidations, validateState, handleInputChange, onChange]
    );

    return (
        <Input.Container>
            <Input.Label up={labelIsUp} htmlFor={name}>
                {label}
            </Input.Label>
            <Input.Field
                type="email"
                onChange={handleChange}
                value={value}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                id={name}
                name={name}
            />
            {t("play.play")}
            {!isValidEmail && <Input.Error>{errorMessage}</Input.Error>}
        </Input.Container>
    );
}

export default GTInputEmail;

GTInputEmail.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    validations: PropTypes.arrayOf(PropTypes.string),
    defaultValidation: PropTypes.bool,
    onChange: PropTypes.func
};

GTInputEmail.defaultProps = {
    validations: defaultValidationObj,
    defaultValidation: true,
    onChange: () => { }
};
