'use client'

import React, { useEffect, useState } from 'react'
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult
} from '@hello-pangea/dnd'
import { Grid, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'next/navigation';

interface ChapterListProps {
    items: Array<{ _id: string; title: string; isPublished: boolean; isFree: boolean; }>

    onRender: (items: { _id: string; position: number }[]) => Promise<void>
    onEdit: (id: string) => void
}

function ChapterList({ items, onRender, onEdit }: ChapterListProps) {
    const [isMounted, setIsMounted] = useState(false)
    const {course_id} = useParams()
    
    const [chapters, setChapters] = useState(items)
    useEffect(() => {
        setChapters(items)
    }, [items])
    useEffect(() => {
        setIsMounted(true)
    }, [])

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const { destination, source } = result;
        if (destination.index === source.index) return;
        const items = Array.from(chapters)
        const [reorderedItem] = items.splice(source.index, 1)
        items.splice(destination.index, 0, reorderedItem)

        const startIndex = Math.min(source.index, destination.index)
        const endIndex = Math.max(source.index, destination.index)

        const updatedChapters = items.slice(startIndex, endIndex+1)

        // setChapters(items)


        const bulkItems = updatedChapters.map((chapter) => ({ 
            id: chapter._id, 
            position: items.findIndex((item) => item._id === chapter._id) 
        }))
        console.log(bulkItems)
        // onRender(bulkItems)

        

    }


    if (!isMounted) {
        return null
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='chapters'>
                {provided => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters?.map((chapter, index) => (
                            <Draggable
                                key={chapter._id}
                                draggableId={chapter._id}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}

                                        style={{
                                            ...provided.draggableProps.style
                                        }}
                                        className='flex items-center  rounded bg-card text-card-foreground border m-2'
                                    >
                                        <div
                                            className={`px-2 py-2 border-r mr-2 ${chapter.isPublished ? '' : ''}`}
                                            {...provided.dragHandleProps}
                                        >
                                            <Grid className='h-5 w-5'/>
                                            {/* <h3 className='line-clamp-1'>{chapter.title}</h3> */}
                                            {/* <button onClick={() => onEdit(chapter._id)}>Edit</button> */}
                                        </div>
                                        <span className='line-clamp-2'> {chapter?.title}</span>
                                        <div className='ml-auto pr-2 flex items-center gap-x-2'>
                                            
                                            <Badge>{chapter?.isFree ? "Free" : "Paid"}</Badge>
                                            <Badge className={`bg-slate-500 ${chapter?.isPublished && 'bg-sky-700'}`}>
                                                {chapter?.isPublished ? 'Published' : 'Draft'}
                                            </Badge>
                                            <Pencil
                                                onClick={() => onEdit(chapter?._id)}
                                                className='h-4 w-4 text-slate-500 hover:text-slate-400 cursor-pointer'
                                            />
                                            
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}

            </Droppable>

        </DragDropContext>
    )
}

export default ChapterList