import { useEffect } from "react";
import { navigate } from "gatsby";
import { observer, inject } from "mobx-react";
import ListItem from "../components/ListItem";
import CreateItemForm from "../components/CreateItemForm";

const Index = ({
  store,
  store: {
    shoppingListData: { items = [] }
  }
}) => {
  useEffect(() => store.getShoppingListItems(), []);

  return (
    <div
      className="
        max-w-screen-xl
        mx-auto
        w-full
      "
    >
      <div className="flex justify-center">
        <div className="max-w-xl w-full">
          <div
            className="
              bg-white
              dark:bg-gray-600
              mb-4
              px-3
              py-2
              rounded-lg
              shadow-md
            "
          >
            <div
              className="
                block
                dark:text-gray-200
                px-2
                py-2
                text-gray-700
                text-lg font-semibold
              "
            >
              Shopping List
            </div>
            <CreateItemForm />
            <div className="py-3">
              {items?.length > 0 &&
                items.map(({ title, completed, itemId }) => (
                  <ListItem key={itemId} {...{ title, completed, itemId }} />
                ))}
            </div>
            <div
              className="
                -mb-2
                -mx-3
                bg-gray-200
                block
                dark:bg-gray-700
                px-3
                py-2
                rounded-b-lg
                text-right
                text-sm
              "
            >
              <button
                className="
                  border
                  border-gray-400
                  dark:hover:border-gray-200
                  dark:hover:text-gray-200
                  dark:text-gray-300
                  hover:border-gray-600
                  hover:text-gray-600
                  px-2
                  py-1
                  rounded
                  text-gray-500
                "
                onClick={() => navigate("/api-documentation")}
              >
                API Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default inject("store")(observer(Index));
