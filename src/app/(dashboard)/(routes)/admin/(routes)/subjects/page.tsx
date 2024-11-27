'use client'
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, subjectsData } from "@/lib/data";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";

import ValidatedImage from '@/components/ValidatedImage';
import { SlidersHorizontal, SortDesc } from "lucide-react";
;
import { useAppSelector } from "@/store/hooks";

type Subject = {
  id: number;
  name: string;
  teachers: string[];
};



const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "",
  },
  
  {
    header: "Actions",
    accessor: "action",
  },
];

const SubjectListPage = () => {
  const user = useAppSelector(state=> state.auth.user);

  const renderRow = (item: Subject) => (
    <tr
      key={item.id}
      className="border-b text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4 text-nowrap px-4">{item.name}</td>
      <td className=" text-nowrap px-4">{item.teachers.join(",")}</td>
      <td className="text-nowrap px-4">
        <div className="flex items-center gap-2">
          {user?.role === "admin" && (
            <>
              <FormModal table="subject" type="update" data={item} />
              <FormModal table="subject" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="text-card-foreground p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full ">
            <SlidersHorizontal size={20} className=""/>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full">
              <SortDesc size={20}/>
            </button>
            {user?.role === "admin" && <FormModal table="teacher" type="create" />}
             <FormModal table="teacher" type="create" />
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={subjectsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default SubjectListPage;
