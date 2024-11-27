
import { Copy, Share2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa6'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import api from '@/api'
import { addChats } from '@/store/chat/chatSlice'
import AvatarLayout from './AvatarLayout'
import { toast } from './ui/use-toast'

function ShareButton({ className, textToShare }: any) {

  const chats = useAppSelector((state) => state.chat.chats)
  const user = useAppSelector((state) => state.auth.user)

  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('')
  const dispatch = useAppDispatch()


  const getChats = async () => {


    api.get(`/v1/chat-app/chats`)
      .then((res) => {
        const chats = res.data.data
       

        dispatch(addChats(chats || []))
      })
      .catch((error) => {
        console.log(error)
      })


  };

  useEffect(() => {
    getChats()
    const url = window.location.href;
    if (url) {
      setCopied(false);
      setUrl(url);
    }
  }, [])

  const sendMessage = (_id: string) => {

    const message = `Url: ${url}
    title: ${textToShare}
    `


    api.post(`/v1/chat-app/messages/${_id}`, { content: message })
      .then(() => {
        toast({
          title: 'Message sent successfully',
          description: 'Your message has been sent.',
          variant: 'success'
        })
      })
      .catch((error) => {
        toast({
          title: 'Failed to send message',
          description: error.response.data.message,
          variant: 'destructive'
        })
        console.log('Failed to send message')
      });
  }

  const copyToClipboard = () => {
    // Get the current page URL
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopied(true);
        // Optionally, you can reset the 'copied' state after a few seconds
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy text: ', err));
  };

  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        <Button className='bg-transparent text-foreground hover:bg-transparent p-0 m-0 text-center '>

          <Share2 className='text-md'/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[200px] overflow-auto">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                defaultValue={url}
                readOnly
              />
            </div>
            <Button type="submit" size="sm" className={`px-2 bg-transparent text-foreground border hover:bg-transparent ${copied && "text-green-500"}`} onClick={copyToClipboard}>
              <span className="sr-only">Copy</span>
              <Copy />
            </Button>
          </div>
          <div className="flex space-x-4 my-4">
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              <FaFacebook size={24} />
            </a>

            {/* Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(textToShare)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500"
            >
              <FaTwitter size={24} />
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(textToShare)} ${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600"
            >
              <FaWhatsapp size={24} />
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent('Bright Veil: A learning plateform')}&summary=${encodeURIComponent(textToShare)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-800"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
          <div className='w-full flex flex-wrap justify-evenly '>
            {
              chats?.length ? chats.map((chat, index) => {
                if (chat.isGroupChat) {
                  return (
                    <div key={index} className='flex flex-col items-center gap-2 w-1/4' onClick={() => sendMessage(chat?._id)}>
                      <AvatarLayout src={chat?.avatar?.url} alt={chat?.name} className='w-10 h-10 rounded-full' name={chat?.name} />
                      <div>
                        <span className='text-sm font-medium text-center'>{chat?.name}</span>
                      </div>
                    </div>
                  )
                } else {
                  const chatUser = chat.participants.find((participant) => participant._id !== user?._id)
                  return (
                    <div key={index} className='flex flex-col items-center gap-2 w-1/4' onClick={() => sendMessage(chat?._id)}>
                      <AvatarLayout src={chatUser?.avatar?.url} alt={chatUser?.name} className='w-10 h-10 rounded-full' />
                      <div>
                        <span className='text-sm font-medium text-center'>{chatUser?.username}</span>
                        {/* <span className='text-xs'>{'jjj'}</span> */}
                      </div>
                    </div>
                  )
                }
              })

                // Render a message if there are no chats yet
                : <div className='text-center text-sm'>No chats found</div>
            }

          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ShareButton