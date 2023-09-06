import { useCallback, useState } from "react";

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
    // Какая-то дичь, но она работает
    if (e.target.type === 'password' && e.target.validity.patternMismatch) {
      e.target.setCustomValidity(
        "Пароль должен быть длиннее 8 символов и содержать хотя бы одну заглавную букву, а также цифру"
      );
    } else {
      e.target.setCustomValidity("");
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
    setErrors,
    resetForm,
    setIsValid,
  };
}
