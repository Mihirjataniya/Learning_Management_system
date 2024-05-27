"use client"

import { ConfirmModal } from "@/components/models/ConfirmModel"
import { Button } from "@/components/ui/button"
import { useConfettiStore } from "@/hooks/useConfettiStore"
import axios from "axios"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface CourseActionsProps {
    courseId : string,
    isPublished: boolean,
    disabled: boolean
}

function CourseActions({
    courseId ,
    isPublished,
    disabled
}:CourseActionsProps) {
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)
    const confetti = useConfettiStore()
    const onClick = async () => {
        try {
            setIsLoading(true)
            if(isPublished){
                console.log(courseId)
                await axios.patch(`/api/courses/${courseId}/unpublish`)
                toast.success("Course unpublished")
                router.refresh()
            }else{
                await axios.patch(`/api/courses/${courseId}/publish`)
                toast.success("Course published")
                router.refresh()
                confetti.onOpen()
            }
        } catch (error) {
            toast.error("Something went wrong")
        }finally{
            setIsLoading(false)
        }
    }


    const onDelete = async () => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/courses/${courseId}`)
            toast.success("Course deleted")
            router.refresh()
            router.push(`/teacher/courses`)
        } catch (error) {
            toast.error("Something went wrong")
        }finally{
            setIsLoading(false)
        }
    }

  return (
    <div className="flex items-center gap-x-2">
      <Button disabled={isLoading} onClick={onClick}  size={"sm"}
      >{isPublished? "Unpublish" : "Publish"}</Button>
      <ConfirmModal onConfirm={onDelete}>   
          <Button variant={'destructive'} size={"sm"} ><Trash className="h-4 w-4"/></Button> 
      </ConfirmModal>
 
    </div>
  )
  }

export default CourseActions
