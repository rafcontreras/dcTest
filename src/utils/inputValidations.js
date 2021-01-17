const isRequired = ({ field }) => {
  const { value, disabled } = field;
  const required = value.trim();
  if (!disabled) {
    return [required, field.$extra.errorMessages.empty];
  }
  return [disabled];
};

export {
  isRequired
}