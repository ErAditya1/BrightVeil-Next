'use client'
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { classesData, role } from "@/lib/data";
import { useAppSelector } from "@/store/hooks";
import { SlidersHorizontal, SortDesc } from "lucide-react";
;




type Class = {
  id: number;
  name: string;
  capacity: number;
  grade: number;
  supervisor: string;
};


const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ClassListPage = () => {
  const user = useAppSelector(state=> state.auth.user);
  const renderRow = (item: Class) => (
    <tr
      key={item.id}
      className="border-b   text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4 text-nowrap px-4">{item.name}</td>
      <td className="text-nowrap px-4">{item.capacity}</td>
      <td className="text-nowrap px-4">{item.grade}</td>
      <td className="text-nowrap px-4">{item.supervisor}</td>
      <td>
        <div className="flex items-center gap-2 text-nowrap px-4">
          {user?.role === "admin" && (
            <>
              <FormModal table="class" type="update" data={item} />
              <FormModal table="class" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className=" p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full ">
              <SlidersHorizontal size={20} className=""/>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full">
              <SortDesc size={20}/>
            </button>
            {user?.role === "admin" && <FormModal table="class" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={classesData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ClassListPage;
