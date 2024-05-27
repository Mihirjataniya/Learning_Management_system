"use client"

import * as z from "zod"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { File, ImageIcon, Loader, Pencil, PlusCircle, X } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Attachment, Course } from "@prisma/client"
import Image from "next/image"
import FileUpload from "@/components/FileUpload"


interface ResrouceFormProps {
    initialData: Course & {attachments : Attachment[]}
    courseId: string
}

const formSchema = z.object({
    url: z.string().min(1)
})

function ResrouceForm({
    initialData,
    courseId
}: ResrouceFormProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [deletingid,setDeletingid] = useState<string | null>(null)

    const ToggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/attachments`,values)
            toast.success("Course updated")
            ToggleEdit()
            router.refresh()
        } catch (error) {
            console.log("Course Customization " + error)
            toast.error("Something went wrong")
        }
    }
    const onDelete = async (id:string) => {
        try {
            setDeletingid(id);
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
            toast.success("Item deleted.")
            router.refresh()

        } catch (error) {
            console.log("Deleting attachment   " +error)
            toast.error("Cannot delete the item. ")
        }finally{
            setDeletingid(null)
        }
    }
    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between mb-2">
                Course attachments:
                <Button onClick={ToggleEdit}>
                    {isEditing && (
                        <>Cancel</>
                    )} 
                    {!isEditing &&  (
                    <>
                        <PlusCircle className="h-4 w-4 mr-2" />
                            Add attachments
                    </>

                    )}
                </Button>
            </div>
            {!isEditing && (
                <>
                    {initialData.attachments.length == 0 && (
                        <p className="text-sm mt-2 text-slate-500 itaclic">
                            No attachments yet
                        </p>
                    )}
                    {initialData.attachments.length > 0 && (
                        <div className="space-y-2">
                            {initialData.attachments.map((attachment)=>(
                                <div key={attachment.id} className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
                                    <File className="h-4 w-4 flex-shrink-0 mr-1" />
                                    <p className="text-sm">
                                        {attachment.name}
                                    </p>
                                    {deletingid === attachment.id ? 
                                            (
                                                <div>
                                                    <Loader className="h-4 w-4 ml-2 animate-spin" />
                                                </div>
                                            ):
                                                <button className="ml-auto hover:opacity-50 transition">
                                                    <X onClick={()=>onDelete(attachment.id)} className="h-4 w-4" />
                                                </button>
                                }
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {isEditing && (
                <div>
                    <FileUpload  
                        endpoint="courseAttachments"
                        onChange={(url)=>{
                            if(url){
                                onSubmit({url: url})
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Add value to the students learning journey by providing them a structred documents.
                    </div>
                </div>
            )}
        </div>
    )
}

export default ResrouceForm
