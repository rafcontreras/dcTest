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
            rounded-r-none
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
          <button
            className="
            -ml-px
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
            rounded-l-none
            text-gray-700
            transition
          "
          >
            <div className="flex leading-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1280 1280"
                className="w-5 h-5"
              >
                <g transform="translate(0,200)">
                  <path d="M295.6 780.7h-145l30 30v-127-18c-2.9 7.1-5.9 14.1-8.8 21.2l15.4-15.4 41.9-41.9 62-62 75.6-75.6 82.7-82.7 83.4-83.4 77.6-77.6 65.4-65.4 46.7-46.7c7.2-7.2 14.3-14.4 21.5-21.5l.6-.6.1-.1c2.4-2.6.8 1.5-2.7 2 .6-.1 2.1-1.1 2.5-1.3l-7.2 3c1.8-.7 3.5-1.1 5.3-1.4-2.7.4-5.3.7-8 1.1 1.4-.1 2.7-.1 4.1 0-2.7-.4-5.3-.7-8-1.1 1.9.3 3.6.7 5.3 1.4l-7.2-3c.6.3 1.3.7 1.9.9 2.3.8-3.1-2.2-3.1-2.6l1.1 1c.1.1.2.3.4.4l2 2 8.2 8.2 28.8 28.8 65.2 65.2 10.5 10.5 2.7 2.7c.2.2.3.4.5.5l.1.1c.8.7 2.5 3-.5-.8-3.2-4-.8-.6-.2.6l-3-7.2c.7 1.8 1.1 3.5 1.4 5.3-.4-2.7-.7-5.3-1.1-8 .1 1.4.1 2.7 0 4.1.4-2.7.7-5.3 1.1-8-.3 1.9-.7 3.6-1.4 5.3l3-7.2c-.2.3-1.3 2.5-1.3 2.5-.1-.3 4.5-4.9 2.5-3.2-.5.5-.3.4-.5.6l-.1.1-.6.6-2.7 2.7-10.9 10.9-41.1 41.1-61.4 61.4-75.2 75.2-82.6 82.6-83.5 83.5-77.9 77.9-65.9 65.9-47.4 47.4c-7.5 7.5-15.1 14.9-22.5 22.5l-1 1c-11.1 11.1-11.9 31.5 0 42.4 12 11 30.6 11.9 42.4 0l22.4-22.4 59.4-59.4 84.6-84.6 98.8-98.8 101.2-101.2 91.7-91.7 71.6-71.6 39-39c1.1-1.1 2.3-2.2 3.4-3.4 9-9.2 13.9-20.4 14.8-33.1 1.8-23.3-15.2-37.6-29.9-52.3l-90.6-90.6L772 72.4c-15.8-15.6-39.5-20.1-59.4-9.1-6.2 3.4-10.8 8.2-15.7 13.1l-41 41-72.7 72.7-92.5 92.5-101.3 101.3-98.4 98.4-83.6 83.6-57.9 57.9-15.6 15.6c-7.4 7.4-13 14-13.5 26.1-.6 13.4 0 27 0 40.4v104.5c0 16.2 13.7 30 30 30h145c15.7 0 30.7-13.8 30-30-.5-15.9-13-29.7-29.8-29.7z" />
                  <path d="M586.5 229.8l48.9 48.9 78 78 18.1 18.1c11.1 11.1 31.5 11.9 42.4 0 11-12 11.9-30.6 0-42.4L725 283.5l-78-78-18.1-18.1c-11.1-11.1-31.5-11.9-42.4 0-11 12-11.9 30.6 0 42.4z" />
                  <g>
                    <path d="M136 966.5h721.5c9.8 0 19.5.1 29.3 0h1.3c15.7 0 30.7-13.8 30-30-.7-16.3-13.2-30-30-30H166.6c-9.8 0-19.5-.1-29.3 0H136c-15.7 0-30.7 13.8-30 30 .7 16.3 13.2 30 30 30z" />
                  </g>
                </g>
              </svg>
              Edit
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default inject("store")(observer(ListItem));
