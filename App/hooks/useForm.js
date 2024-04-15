import { useState } from 'react';

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    resetForm,
  };
};

