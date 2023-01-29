const HandleForm = (() => {
  const getFormData = (form) => {
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData);
    return formObject;
  };
  const resetForm = (form) => form.reset();

  return { getFormData, resetForm };
})();

export { HandleForm };
