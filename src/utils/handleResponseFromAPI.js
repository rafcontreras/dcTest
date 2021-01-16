const handleResponseFromAPI = (response, name) => {
  const object = { [name]: null };
  const { data, isOK } = response;
  if (data && isOK) {
    object[name] = data;
  }
  return object;
};

export default handleResponseFromAPI;
