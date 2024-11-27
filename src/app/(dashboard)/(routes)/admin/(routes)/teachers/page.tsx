'use client'
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, teachersData } from "@/lib/data";
import { useAppSelector } from "@/store/hooks";
import { SlidersHorizontal, SortDesc, ViewIcon } from "lucide-react";
;
import ValidatedImage from '@/components/ValidatedImage';
import Link from "next/link";

type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "",
  },
  {
    header: "Classes",
    accessor: "classes",
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

const TeacherListPage = () => {
  const user = useAppSelector(state=> state.auth.user);
  const renderRow = (item: Teacher) => (
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
          <p className="text-xs aaa">{item?.email}</p>
        </div>
      </td>
      <td className="text-nowrap px-4">{item.teacherId}</td>
      <td className="text-nowrap px-4">{item.subjects.join(",")}</td>
      <td className="text-nowrap px-4">{item.classes.join(",")}</td>
      <td className="text-nowrap px-4">{item.phone}</td>
      <td className="text-nowrap px-4">{item.address}</td>
      <td className="text-nowrap px-4">
        <div className="flex items-center gap-2">
          <Link href={`/admin/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <ViewIcon/>
            </button>
          </Link>
          {user?.role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            //   <ValidatedImage src="/delete.png" alt="" width={16} height={16} />
            // </button>
            <FormModal table="teacher" type="delete" id={item.id}/>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className=" p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
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
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              //   <ValidatedImage src="/plus.png" alt="" width={14} height={14} />
              // </button>
              <FormModal table="teacher" type="create"/>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={teachersData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default TeacherListPage;
