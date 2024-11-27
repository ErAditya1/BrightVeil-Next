'use client'
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { eventsData, role } from "@/lib/data";
import { useAppSelector } from "@/store/hooks";
import { SlidersHorizontal, SortDesc } from "lucide-react";
;
import ValidatedImage from '@/components/ValidatedImage';

type Event = {
  id: number;
  title: string;
  class: string;
  date: string;
  startTime: string;
  endTime: string;
};

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Date",
    accessor: "date",
    className: "",
  },
  {
    header: "Start Time",
    accessor: "startTime",
    className: "",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const EventListPage = () => {
  const user = useAppSelector(state=> state.auth.user);
  const renderRow = (item: Event) => (
    <tr
      key={item.id}
      className="border-b text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4 text-nowrap px-4">{item.title}</td>
      <td className="text-nowrap px-4">{item.class}</td>
      <td className="text-nowrap px-4">{item.date}</td>
      <td className="text-nowrap px-4">{item.startTime}</td>
      <td className="text-nowrap px-4">{item.endTime}</td>
      <td>
        <div className="flex items-center gap-2 text-nowrap px-4">
          {user?.role === "admin" && (
            <>
              <FormModal table="event" type="update" data={item} />
              <FormModal table="event" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
          <button className="w-8 h-8 flex items-center justify-center rounded-full ">
            <SlidersHorizontal size={20} className=""/>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full">
              <SortDesc size={20}/>
            </button>
            {user?.role === "admin" && <FormModal table="event" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={eventsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default EventListPage;
