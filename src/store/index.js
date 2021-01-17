import { observable, action } from "mobx";
import testLocalStorage from "./storeUtils/testLocalStorage";
import {
  getShoppingListItems,
  addShoppingListItem,
  editShoppingListItem,
  setShoppingListItems,
  removeShoppingListItem,
  resetShoppingListItems
} from "./storeUtils/shoppingListDataFunctions";
import { localStored } from "../utils/mobxStorageHydration";

const windowExists = typeof window === "object";
const storageAvailable = windowExists ? testLocalStorage() : false;
const shoppingListData = {};

const ui = {
  gettingItems: false
};

const forms = {
  createItemForm: null,
  editForm: null
};

class Store {
  @observable shoppingListData;
  @observable loaded;
  @observable ui;
  @observable forms;

  constructor() {
    this.ui = ui;
    this.forms = forms;
    this.loaded = false;
    this.shoppingListData = localStored({
      key: "shoppingListData",
      defaultValue: shoppingListData,
      storageAvailable
    });
  }

  @action
  setLoaded(value) {
    this.loaded = value;
  }

  @action
  setForm = (property, value) => {
    this.forms[property] = value;
  };

  @action
  setUI(prop, val) {
    this.ui[prop] = val;
  }

  @action
  setUI(prop, val) {
    this.ui[prop] = val;
  }

  @action
  resetUI() {
    this.ui = ui;
  }

  @action
  getShoppingListItems = getShoppingListItems.bind(this);

  @action
  editShoppingListItem = editShoppingListItem.bind(this);

  @action
  addShoppingListItem = addShoppingListItem.bind(this);

  @action
  removeShoppingListItem = removeShoppingListItem.bind(this);

  @action
  setShoppingListItems = setShoppingListItems.bind(this);

  @action
  resetShoppingListItems = resetShoppingListItems.bind(this);
}

const store = new Store();

export default store;
