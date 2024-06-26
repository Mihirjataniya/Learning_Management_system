"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Pencil, PlusCircle } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Chapter, Course } from "@prisma/client"
import { Input } from "@/components/ui/input"
import ChaptersList from "./ChaptersList"


interface ChaptersFormProps {
    initialData: Course & {chapters: Chapter[]}
    courseId: string
}

const formSchema = z.object({
    title: z.string().min(1),

})

function ChaptersForm({
    initialData,
    courseId
}: ChaptersFormProps) {
    const [isCreating,setIsCreating] = useState(false)
    const [isUpdating,setIsupdating] = useState(false)
    const ToggleCreating = () => {
        setIsCreating((current) => !current)
    }

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
           title: ""
        }
    })

    const { isSubmitting, isValid } = form.formState


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
             await axios.post(`/api/courses/${courseId}/chapters`,values)
            toast.success("Chapter Created")
            ToggleCreating()
            router.refresh()
        } catch (error) {
            console.log("Course Customization " + error)
            toast.error("Something went wrong")
        }
    }

    const onEdit = (id : string) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`)
    }
    
    return (
        <div className="mt-6 border  bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course chapters:
                <Button onClick={ToggleCreating}>
                    {isCreating ? (
                        <>Cancel</>
                    ) : <>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add chapter
                    </>}
                </Button>
            </div>
            {isCreating && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((onSubmit))} className="space-y-4 mt-4">
                        <FormField control={form.control} name="title" 
                            render={({field})=>(
                                <FormItem>
                                    <FormControl>
                                        <Input disabled={isSubmitting} placeholder="e.g. 'Introduction to the course'" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                         )}
                        />
                                <Button disabled={!isValid || isSubmitting} type="submit">Create</Button>
                    </form>
                </Form>
            )}
            {!isCreating  &&   (
                <div className={cn(
                    "text-sm mt-2" ,
                    !initialData.chapters.length && 'text-slate-500 italice'
                )}>
                    {initialData.chapters.length ===0 && "No chapters exists"}
                    <ChaptersList onEdit={onEdit} items={initialData.chapters || []} />
                </div>
            )}

        </div>
    )
}

export default ChaptersForm
