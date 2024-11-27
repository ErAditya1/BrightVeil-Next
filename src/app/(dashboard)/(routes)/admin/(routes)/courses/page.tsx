'use client'
import api from "@/api";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { classesData, role } from "@/lib/data";
import { useAppSelector } from "@/store/hooks";
import { formatUploadDateTime } from "@/utils/agoTime";
import { SlidersHorizontal, SortDesc } from "lucide-react";
import ValidatedImage from '@/components/ValidatedImage';
import Link from "next/link";

import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";



type Class = {
  _id: number;
  title:string;
  thumbnail:{
    secure_url:string;
  };
  language:string;
  printPrice:string
  sellingPrice:string;
  discount:string;
  from:string;
  to:string;
  isPublished:boolean;
  createdAt:string;

};

const columns = [
  {
    header: "Thumbnail",
    className: "max-w-40",
    accessor: "1",
  },
  {
    header: "Title",
    accessor: "2",
    className: "max-w-40",
  },
  {
    header: "Language",
    accessor: "3",
  },
  {
    header: "Price",
    accessor: "4",
    className: "",
  },
  {
    header: "Selling Price",
    accessor: "5",
  },
  {
    header: "Discount",
    accessor: "6",
  },
  {
    header: "Starts On",
    accessor: "7",
  },
  {
    header: "Ends On",
    accessor: "8",
  },
  {
    header: "Status",
    accessor: "9",
  },
  {
    header: "Uploaded On",
    accessor: "10",
  },
  {
    header: "Actions",
    accessor: "11",
  },
];




const ClassListPage = () => {
  const [courseData, setCourseData]= useState([{
    title: '',
    description: '',
    thumbnail: '',
    language: '',
    printPrice: 0,
    sellingPrice: 0,
    discount: 0,
  }])
  const [filtersedData ,setFilteredData ] = useState(
    [{
      title: '',
      description: '',
      thumbnail: '',
      language: '',
      printPrice: 0,
      sellingPrice: 0,
      discount: 0,
    }]
  )

  useEffect(() => {
      
    api.patch("/v1/courses/course/getAdminCourses", {})
      .then((res:any) => {
        console.log(res.data.data)
        setCourseData(res.data.data)
        setFilteredData(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
    
}, [])

const handleChange = (text:String)=>{
  // TODO: implement search functionality
  const value = text?.toLowerCase()
  const data = courseData?.filter((c:any) => {
    return c?.title?.toLowerCase()?.includes(value) || c?.language?.toLowerCase()?.includes(value) || c?.description?.toLowerCase()?.includes(value) || c?.printPrice?.toString()?.includes(value) || c?.sellingPrice?.toString()?.includes(value) || c?.discount?.toString()?.includes(value)

  })
  setFilteredData(data)
}

  const user = useAppSelector(state=> state.auth.user);
  const renderRow = (item: Class) => (
    <tr
      key={item._id}
      className="border-b  text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4 px-4 text-nowrap ">
        <div className="aspect-video h-12 border rounded">
        {
          item?.thumbnail?.secure_url && (
            <ValidatedImage
              src={item.thumbnail.secure_url}
              alt={item.title}
              width={100}
              height={100}
              className="w-full h-full"
            />
          )
        }
        </div>
      </td>
      <td className=" text-wrap px-4 min-w-80 ">
        <p className="line-clamp-3">
          {item?.title}
        </p>
      </td>
      <td className=" text-nowrap px-4">{item.language}</td>
      <td className=" text-nowrap px-4">{item.printPrice}</td>
      <td className=" text-nowrap px-4">{item.sellingPrice}</td>
      <td className=" text-nowrap px-4">{item.discount}</td>
      <td className=" text-nowrap px-4">{formatUploadDateTime(item.from)}</td>
      <td className=" text-nowrap px-4">{ formatUploadDateTime(item.to)}</td>
      <td className=" text-nowrap px-4">
        {item.isPublished? "Published" : "Unpublished"}
      </td>
      <td className=" text-nowrap px-4">{formatUploadDateTime(item.createdAt )}</td>
      <td>
        <div className="flex items-center gap-2">
          {user?.role === "admin" && (
            <>
              <Link href={`/admin/courses/edit-course/${item?._id}`} className="text-xl"><FaEdit/></Link>
              |
              <FormModal table="course" type="delete" id={item._id} />
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
          <TableSearch handleChange={handleChange}/>
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full ">
            <SlidersHorizontal size={20} className=""/>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full">
              <SortDesc size={20}/>
            </button>
            {user?.role === "admin" && <FormModal table="course" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={filtersedData!} />
      {/* PAGINATION */}
      {/* <Pagination /> */}
    </div>
  );
};

export default ClassListPage;
