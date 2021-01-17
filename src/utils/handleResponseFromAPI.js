const handleResponseFromAPI = (response) => {
  const { data, isOK } = response;
  if (data && isOK) {
    return data;
  }
  return null;
};

export default handleResponseFromAPI;
