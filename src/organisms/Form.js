import { observer, inject } from "mobx-react";
import FieldSet from "./FieldSet";

const Form = ({
  form,
  form: { onSubmit, name: formName },
  store: {
    ui: { gettingItems }
  },
  fields
}) => {
  return (
    <form
      autoComplete="chrome-off"
      disabled={gettingItems}
      method="POST"
      name={formName}
      noValidate="novalidate"
      onSubmit={onSubmit}
      target={`dummy${formName}`}
    >
      {fields && <FieldSet fields={fields} form={form} />}
    </form>
  );
};

export default inject("store")(observer(Form));
