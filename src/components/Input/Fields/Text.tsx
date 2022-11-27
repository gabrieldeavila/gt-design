/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable operator-linebreak */
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useInputValues from '../../../hooks/pageState/useInputValues'
import useValidateState from '../../../hooks/validation/useValidateState'
import useValidateText from '../../../hooks/validation/useValidateText'
import Input from '../Input'
import { IGTInputText } from './interface'

const defaultValidationObj = ['required', 'noInitialSpace', 'noEndingSpaces']
function GTInputText({
  name,
  label,
  validations,
  defaultValidation,
  minWords,
  maxWords,
  minChars,
  maxChars,
  onChange
}: IGTInputText) {
  const { t } = useTranslation()

  const [errors, setErrors] = useState({})

  const inputValidations = useMemo(() => {
    if (defaultValidation) {
      return [...defaultValidationObj, ...validations]
    }

    return validations
  }, [defaultValidation, validations])

  const { validateState } = useValidateState(name, inputValidations)

  const { labelIsUp, value, handleInputChange, handleInputBlur, handleInputFocus } =
    useInputValues(name)

  const { validateText, validateMinAndMax } = useValidateText(
    minWords,
    maxWords,
    minChars,
    maxChars
  )
  const [isValidText, setIsValidText] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (value.length === 0) return

    const { isValid, invalidMessage } = validateText(value, inputValidations)

    setIsValidText(isValid)
    setErrorMessage(invalidMessage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = useCallback(
    (e: any) => {
      const { value: iVal } = e.target
      const { isValid, invalidMessage } = validateText(iVal, inputValidations)
      const { isAllValid, invalidAllMessage, errorsVars } = validateMinAndMax(invalidMessage, isValid, iVal)

      validateState(isAllValid, iVal)
      setErrorMessage(invalidAllMessage)
      setIsValidText(isAllValid)
      setErrors(errorsVars)
      handleInputChange(iVal)

      onChange(e)
    },
    [onChange, validateText, inputValidations, validateMinAndMax, validateState, handleInputChange]
  )

  return (
    <Input.Container>
      <Input.Label up={labelIsUp} htmlFor={name}>
        {label}
      </Input.Label>
      <Input.Field
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        id={name}
        name={name}
      />
      {!isValidText && <Input.Error>{t(`TEXT.${errorMessage}`, errors)}</Input.Error>}
    </Input.Container>
  )
}

export default GTInputText

GTInputText.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  validations: PropTypes.arrayOf(PropTypes.string),
  minWords: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWords: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValidation: PropTypes.bool,
  minChars: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxChars: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

GTInputText.defaultProps = {
  onChange: () => { },
  validations: defaultValidationObj,
  minWords: 0,
  maxWords: 0,
  defaultValidation: true,
  minChars: 0,
  maxChars: 0
}
