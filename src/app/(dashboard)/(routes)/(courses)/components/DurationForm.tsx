"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon, Edit } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FormLabel } from "@/components/ui/form"
import api from "@/api"
import { useParams } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"


export function DatePickerWithRange({
    className,
    from,
    to
}: any) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: from || new Date(),
        to: to || addDays(new Date(), 30),
    })
    const [edit, setEdit] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const { course_id } = useParams();

    const handleDateChange = () => {
        
        api.patch(`/v1/courses/course/updateDuration/${course_id}`,date,{
           
        })
        .then((res) => {
            setEdit(false)
            toast({
                title: 'Success!',
                description: res.data.message,
                variant:'success'
            })
        })
        .catch((error) => {
            const axiosError = error as AxiosError<ApiResponse>;
            console.log(axiosError)
            // Default error message
            let errorMessage = axiosError.response?.data.message;
            

            toast({
                title: 'Creation Failed',
                description: errorMessage,
                variant: 'destructive',
            });
        });
    
        


    }

    return (
        <div className="flex justify-center items-center ">
            <div className="w-full bg-card text-card-foreground  border rounded shadow-md p-2">
                <div className={cn("grid gap-2", className)}>
                    <div className='flex justify-between'><span>Select Duration:</span>{!edit && (<span className='text-sm gap-1 flex flex-row' onClick={() => setEdit(true)}><Edit size={15} />Edit</span>)}</div>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "w-[300px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                                disabled={!edit}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date?.from, "LLL dd, y")} -
                                            {format(date?.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                    {
                        edit && (
                            <div className="flex items-center gap-x-4">

                                <Button
                                    type='button'
                                    onClick={() => setEdit(false)}
                                >
                                    Cancel
                                </Button>


                                <Button
                                    type='submit'
                                    disabled={ isSubmitting}
                                    onClick={handleDateChange}
                                >
                                    Continue
                                </Button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

    )
}
