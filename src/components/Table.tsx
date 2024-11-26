const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <div className="w-full overflow-auto" key={Date.now()}>
      <table className="w-full mt-4">
      <thead>
        <tr className="text-left aaa bg-gray-200 dark:bg-gray-900 h-10 p-4 mx-2 gap-4 text-sm">
          {columns?.map((col) => (
            <th key={col.accessor} className={`${col.className} break-keep text-nowrap px-4 `}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody >{data?.map((item) => renderRow(item))}</tbody>
    </table>
    </div>
  );
};

export default Table;
