'use client'
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { parentsData, role } from "@/lib/data";
import { useAppSelector } from "@/store/hooks";
import { SlidersHorizontal, SortDesc } from "lucide-react";
;
import ValidatedImage from '@/components/ValidatedImage';

type Parent = {
  id: number;
  name: string;
  email?: string;
  students: string[];
  phone: string;
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student Names",
    accessor: "students",
    className: "",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "",
  },
  {
    header: "Address",
    accessor: "address",
    className: "",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ParentListPage = () => {
  const user = useAppSelector(state=> state.auth.user);
  const renderRow = (item: Parent) => (
    <tr
      key={item.id}
      className="border-b text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4 text-nowrap px-4">
        <div className="flex flex-col">
          <h3 className="font-semibold text-nowrap px-4">{item.name}</h3>
          <p className="text-xs aaa text-nowrap px-4">{item?.email}</p>
        </div>
      </td>
      <td className="text-nowrap px-4">{item.students.join(",")}</td>
      <td className="text-nowrap px-4">{item.phone}</td>
      <td className="text-nowrap px-4">{item.address}</td>
      <td>
        <div className="flex items-center gap-2 text-nowrap px-4">
          {user?.role === "admin" && (
            <>
              <FormModal table="parent" type="update" data={item} />
              <FormModal table="parent" type="delete" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
          <button className="w-8 h-8 flex items-center justify-center rounded-full ">
            <SlidersHorizontal size={20} className=""/>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full">
              <SortDesc size={20}/>
            </button>
            {user?.role === "admin" && (
              <FormModal table="teacher" type="create"/>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={parentsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ParentListPage;
