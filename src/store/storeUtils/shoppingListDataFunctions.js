import {
  getShoppingList,
  putListItem,
  postListItem,
  deleteListItem
} from "../../utils/restFunctions";
import handleResponseFromAPI from "../../utils/handleResponseFromAPI";
const shoppingListData = {};

async function getShoppingListItems() {
  this.setUI("gettingItems", true);
  const { items = [] } = await getShoppingList().then(handleResponseFromAPI);
  if (items) {
    this.setShoppingListItems({ items });
  }
  this.setUI("gettingItems", false);
}

async function addShoppingListItem({ title }) {
  this.setUI("gettingItems", true);
  const { items = [] } = await postListItem(title).then(handleResponseFromAPI);
  if (items) {
    this.setShoppingListItems({ items });
  }
  this.setUI("gettingItems", false);
}

async function editShoppingListItem(item) {
  this.setUI("gettingItems", true);
  const { items = [] } = await putListItem(item).then(handleResponseFromAPI);
  if (items) {
    this.setShoppingListItems({ items });
  }
  this.setUI("gettingItems", false);
}

async function removeShoppingListItem(item) {
  this.setUI("gettingItems", true);
  const { items = [] } = await deleteListItem(item).then(handleResponseFromAPI);
  if (items) {
    this.setShoppingListItems({ items });
  }
  this.setUI("gettingItems", false);
}

function setShoppingListItems(data) {
  const currentShoppingListItems = { ...this.shoppingListData, ...data };
  this.shoppingListData.extend(currentShoppingListItems);
}

function resetShoppingListItems() {
  this.shoppingListData.extend(shoppingListData);
}

export {
  shoppingListData,
  addShoppingListItem,
  getShoppingListItems,
  editShoppingListItem,
  setShoppingListItems,
  removeShoppingListItem,
  resetShoppingListItems
};
