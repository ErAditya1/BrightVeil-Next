import React from 'react'
import { FaCheck, FaCheckDouble } from 'react-icons/fa6'
import { IoCheckmark, IoCheckmarkDoneSharp } from 'react-icons/io5'

function MessageStatus({messageStatus}:any) {
    
  return (
    <>
        {messageStatus === 'sent' && <IoCheckmark /> }
        {messageStatus === 'delivered' && <IoCheckmarkDoneSharp />}
        {messageStatus === 'read' && <IoCheckmarkDoneSharp className='text-blue-400'/>}
    </>
  )
}

export default MessageStatus