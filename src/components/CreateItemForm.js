import { useEffect } from "react";
import { observer, inject } from "mobx-react";
import FormConstructor from "../organisms/FormConstructor";
import Form from "../organisms/Form";
import itemInputs from "../utils/formFields/itemInputs";

const createItemForm = new FormConstructor(
  { fields: itemInputs },
  { name: "createItemForm" }
);

const CreateItemForm = ({
  store,
  store: {
    forms
  }
}) => {

  useEffect(() => {
    if (!forms?.createItemForm) {
      store.setForm("createItemForm", createItemForm);
    }
  });

  return (
    <Form
      fields={itemInputs}
      form={createItemForm}
    />
  );
};

export default inject("store")(observer(CreateItemForm));
