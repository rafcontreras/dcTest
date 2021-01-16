import createTitle from "../utils/createTitle";

const TableHead = ({ headers, headerClassName = "", breakFirst = false }) => {
  return (
    <thead>
      <tr className={headerClassName}>
        <th></th>
        {headers.map((header, index) => {
          const key = `header_${header}_${index}`;
          return (
            <th key={key} className="text-center">
              {createTitle(header, breakFirst)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
