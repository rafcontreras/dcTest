import { requestToApi } from "react-data-fetching";

const apiUrl = "/api/v1/shopping-list";
const timeout = 10000;

const getShoppingList = () => {
  const url = apiUrl;

  return requestToApi({
    url,
    method: "GET",
    timeout
  });
};

const putListItem = ({ title, completed, itemId }) => {
  const url = `${apiUrl}/item/${itemId}`;
  const body = { title, completed, itemId };

  return requestToApi({
    url,
    body,
    method: "PUT",
    timeout
  });
};

const postListItem = title => {
  const url = `${apiUrl}/item`;
  const body = { title };

  return requestToApi({
    url,
    body,
    method: "POST",
    timeout
  });
};

const deleteListItem = ({ title, completed, itemId }) => {
  const url = `${apiUrl}/item/${itemId}`;
  const body = { title, completed, itemId };

  return requestToApi({
    url,
    body,
    method: "DELETE",
    timeout
  });
};

export { getShoppingList, putListItem, postListItem, deleteListItem };
