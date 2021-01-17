import { useEffect } from "react";
import { observer, inject } from "mobx-react";
import ListItem from "../components/ListItem";
import CreateItemForm from "../components/CreateItemForm";

const Index = ({
  store,
  store: {
    shoppingListData: { items = [] },
    ui: { gettingItems }
  }
}) => {
  useEffect(() => store.getShoppingListItems(), []);

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="flex justify-center">
        <div className="w-full max-w-xl">
          <div className="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
            <div className="block text-gray-700 text-lg font-semibold py-2 px-2">
              Shopping List
            </div>
            <CreateItemForm />
            <div className="py-3">
              {items?.length > 0 &&
                items.map(({ title, completed, itemId }) => (
                  <ListItem key={itemId} {...{ title, completed, itemId }} />
                ))}
            </div>
            <div className="block bg-gray-200 text-sm text-right py-2 px-3 -mx-3 -mb-2 rounded-b-lg">
              <button className="hover:text-gray-600 hover:border-gray-600 border border-gray-400 text-gray-500 py-1 px-2 rounded">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default inject("store")(observer(Index));
