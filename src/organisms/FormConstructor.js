import MobxReactForm from "mobx-react-form";
import vjf from "mobx-react-form/lib/validators/VJF";
import store from "../store";

const hooks = {
  onSuccess(form) {
    const { name: formName } = form;
    try {
      switch (formName) {
        case "createItemForm":
          store.addShoppingListItem(form.values(), formName);
          break;
        // case "changePasswordForm":
        //   changePasswordSubmit(form.values(), formName);
        //   break;
        // case "resetPasswordForm":
        //   resetPasswordSubmit(form.values(), formName);
        //   break;
        // case "newPasswordForm":
        //   newPasswordSubmit(form.values(), formName);
        //   break;
        default:
          console.log(formName, form.values());
          break;
      }
    } catch (error) {
      console.warn(error);
    }
  },
  onError(form) {
    const errors = form.errors();
    console.warn(errors);
  }
};

export default class FormConstructor extends MobxReactForm {
  hooks() {
    return hooks;
  }

  plugins() {
    return {
      vjf: vjf()
    };
  }

  options() {
    return {
      autoParseNumbers: true,
      validateOnInit: false
    };
  }
}
