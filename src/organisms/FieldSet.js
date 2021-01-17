import { Fragment } from "react";
import { observer, inject } from "mobx-react";

const FieldSet = ({
  form,
  form: { name: formName },
  fields,
  store: {
    ui: { gettingItems }
  }
}) => {
  return (
    <fieldset>
      {fields &&
        fields
          .filter(field => field.type !== "button")
          .map(input => {
            const { type, name: fieldName, extra } = input;
            const field = form.$(fieldName);
            const { error } = field;
            return (
              <Fragment key={`${formName}${fieldName}`}>
                {type === "text" && (
                  <div className="rounded-md">
                    <input
                      {...field.bind()}
                      className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight py-2 px-2"
                      disabled={gettingItems}
                      {...extra?.inputProps}
                    />
                  </div>
                )}
              </Fragment>
            );
          })}
    </fieldset>
  );
};

export default inject("store")(observer(FieldSet));
