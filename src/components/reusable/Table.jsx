const Table = ({ cols, children }) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr className="bg-[#D1A054] text-white uppercase">
            <th scope="col" className="p-4">
              <div className="flex items-center">No.</div>
            </th>

            {cols.map((col) => (
              <th scope="col" className="py-3 px-6" key={col.label}>
                <div className="flex items-center">{col.label}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export const Row = ({ children, index }) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="p-4 w-4">
        <div className="flex items-center">{index + 1}</div>
      </td>
      {children}
    </tr>
  );
};
export default Table;
