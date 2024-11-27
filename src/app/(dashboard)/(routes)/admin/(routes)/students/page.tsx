'use client'
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, studentsData } from "@/lib/data";
import { useAppSelector } from "@/store/hooks";
import { SlidersHorizontal, SortDesc, View } from "lucide-react";
;
import ValidatedImage from '@/components/ValidatedImage';
import Link from "next/link";

type Student = {
  id: number;
  studentId: string;
  name: string;
  email?: string;
  photo: string;
  phone?: string;
  grade: number;
  class: string;
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "",
  },
  {
    header: "Grade",
    accessor: "grade",
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

const StudentListPage = () => {
  const user = useAppSelector(state=> state.auth.user);
  const renderRow = (item: Student) => (
    <tr
      key={item.id}
      className="border-b  text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4 text-nowrap px-4">
        <ValidatedImage
          src={item.photo}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs aaa">{item.class}</p>
        </div>
      </td>
      <td className="text-nowrap px-4">{item.studentId}</td>
      <td className="text-nowrap px-4">{item.grade}</td>
      <td className="text-nowrap px-4">{item.phone}</td>
      <td className="text-nowrap px-4">{item.address}</td>
      <td className="text-nowrap px-4">
        <div className="flex items-center gap-2">
          <Link href={`/admin/students/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <View size={20}/>
            </button>
          </Link>
          {user?.role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            //   <ValidatedImage src="/delete.png" alt="" width={16} height={16} />
            // </button>
            <FormModal table="student" type="delete" id={item.id}/>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className=" p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
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
              
              <FormModal table="student" type="create"/>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={studentsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default StudentListPage;
