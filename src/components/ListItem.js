import { useRef } from "react";
import { observer, inject } from "mobx-react";

const ListItem = ({
  title = "",
  completed = false,
  itemId = "",
  store,
  store: {
    ui: { gettingItems }
  }
}) => {
  const itemRef = useRef();

  const toggleCompleted = event => {
    event.preventDefault();
    if (itemRef?.current) {
      store.editShoppingListItem({ title, itemId, completed: !completed });
    }
  };

  const remove = () =>
    store.removeShoppingListItem({ title, itemId, completed });

  return (
    <div
      className="
        dark:hover:bg-gray-500
        dark:text-white
        flex
        h-16
        hover:bg-gray-100
        justify-start
        my-2
        px-3
        py-2
        rounded-md
        text-gray-700
        transition
      "
    >
      <label
        className="
          cursor-pointer
          flex
          flex-grow
          font-medium
          items-center
          px-1
        "
        disabled={gettingItems}
        onClick={toggleCompleted}
      >
        <input
          type="checkbox"
          className="
            form-checkbox
            h-5
            w-5
          "
          disabled={gettingItems}
          ref={itemRef}
          style={{ minWidth: "1.25rem" }}
          checked={completed}
        />
        <span className="clamp-2 ml-3">{title}</span>
      </label>
      <div className="flex items-center">
        <div className="flex text-sm">
          <button
            className="
              border
              border-blue-200
              dark:bg-gray-800
              dark:hover:bg-gray-700
              dark:hover:text-blue-100
              dark:text-gray-200
              duration-200
              ease-in-out
              flex
              focus:outline-none
              hover:bg-white
              hover:scale-110
              justify-center
              px-2
              py-1
              rounded
              text-gray-700
              transition
            "
            onClick={remove}
          >
            <div className="flex leading-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="w-5 fill-current h-5"
              >
                <path d="M20 35h8v.58l4 41A6 6 0 0038 82h24a6 6 0 006-5.42l4-41V35h8v-6H20zm46 0l-4 41H38l-4-41zM42 18h16v6H42z" />
              </svg>
              <span className="hidden md:inline">Remove</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default inject("store")(observer(ListItem));
