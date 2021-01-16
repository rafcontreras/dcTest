const filterTable = (object, string) => {
  const filteredTable =
    object?.tables
      ?.filter(table => table?.tableLabel === string)
      ?.map(table => table?.tableData)
      ?.pop() || null;
  return filteredTable;
};

export default filterTable;
