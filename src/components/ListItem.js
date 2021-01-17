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
      flex
      h-16
      hover:bg-blue-100
      hover:text-blue-400
      justify-start
      my-2
      px-2
      py-2
      rounded-md
      text-gray-700
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
          text-gray-600
          w-5
        "
          disabled={gettingItems}
          ref={itemRef}
          style={{ minWidth: "1.25rem" }}
          checked={completed}
        />
        <span
          className="
          clamp-2
          ml-3
          text-gray-600
        "
        >
          {title}
        </span>
      </label>
      <div
        className="
        flex
        hidden
        items-center
        md:flex
      "
      >
        <div className="flex text-sm">
          <button
            className="
            bg-blue-50
            border
            border-blue-200
            duration-200
            ease-in-out
            flex
            focus:border-blue-300
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
                className="w-5 h-5"
              >
                <path d="M20 35h8v.58l4 41A6 6 0 0038 82h24a6 6 0 006-5.42l4-41V35h8v-6H20zm46 0l-4 41H38l-4-41zM42 18h16v6H42z" />
              </svg>
              Remove
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default inject("store")(observer(ListItem));
