"use client";

import { Delete, Edit, PlusCircle } from "lucide-react";
import dynamic from "next/dynamic";
import ValidatedImage from '@/components/ValidatedImage';
import { useState } from "react";
import { MdDelete } from "react-icons/md";

// USE LAZY LOADING

// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const AddCourseForm = dynamic(() => import("./forms/AddCourseForm"), {
  loading: () => <h1>Loading...</h1>,
});


const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
  course: (type, data) => <AddCourseForm   />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
  
    | "teacher"
    | "course"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <div className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </div>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center  rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        {/* <PlusCircle/> */}
        {type === "create"  && <PlusCircle size={24}/>}
        {type === "update" && <Edit size={18}/>}
        {type === "delete" && <MdDelete size={24}/>}
        {/* <ValidatedImage src={`/${type}.png`} alt="" width={16} height={16} /> */}
      </button>
      {open && (
        <div className="w-screen h-dvh absolute left-0 top-0  bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-card text-card-foreground p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <ValidatedImage src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
