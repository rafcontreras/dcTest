import { requestToApi } from "react-data-fetching";

const apiUrl = "/api/v1/";

const getShoppingListData = method => {
  const url = `${apiUrl}${method}`;

  return requestToApi({
    url,
    method: "GET",
    timeout: 35000,
    onTimeout: () => console.log("timedout"),
    onProgress: progression => {},
    onIntercept: result => {}
  });
};

export { getShoppingListData };
