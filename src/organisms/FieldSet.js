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
            return (
              <Fragment key={`${formName}${fieldName}`}>
                {type === "text" && (
                  <div className="rounded-md">
                    <input
                      {...field.bind()}
                      className="
                        dark:bg-gray-400
                        dark:text-gray-800
                        bg-gray-200
                        leading-tight
                        px-2
                        py-2
                        rounded-md
                        text-gray-700
                        w-full
                      "
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
