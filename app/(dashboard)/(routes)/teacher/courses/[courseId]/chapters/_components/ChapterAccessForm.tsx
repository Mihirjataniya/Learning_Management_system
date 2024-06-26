"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage,FormDescription } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Chapter, Course } from "@prisma/client"
import { Editor } from "@/components/Editor"
import { Preview } from "@/components/preview"
import { Checkbox } from "@/components/ui/checkbox";


interface ChapterAccessFormProps {
    initialData: Chapter,
    courseId: string,
    chapterId: string
}

const formSchema = z.object({
    isFree: z.boolean().default(false)
})  

function ChapterAccessForm({
    initialData,
    courseId,
    chapterId
}: ChapterAccessFormProps) {
    const [isEditing, setIsEditing] = useState(false)
    const ToggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isFree: Boolean(initialData.isFree)
        }
    })

    const { isSubmitting, isValid } = form.formState
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
             await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`,values)
            toast.success("Chapter updated")
            ToggleEdit()
            router.refresh()
        } catch (error) {
            console.log("Course Customization " + error)
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="mt-6 border  bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter access:
                <Button onClick={ToggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : <>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit access
                    </>}
                </Button>
            </div>
            {!isEditing ? (
                <div className={cn(
                    "text-sm mt-2",
                    !initialData.isFree && "text-slate-500 italic"
                )}>
                    {initialData.isFree ? <p>This Chapter available is for free preview</p> : <p>This chapter is not available for free preivew</p>}
                </div>
            ): (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((onSubmit))} className="space-y-4 mt-4">
                        <FormField control={form.control} name="isFree" 
                            render={({field})=>(
                                <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md p-4">
                                    <FormControl>
                                       <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                                    </FormControl>
                                    <div>
                                       <FormDescription>Do you want this chapter to be available for free preivew?</FormDescription>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                         )}
                        />
                        <div className="flex  items-center gap-x-2">
                                <Button disabled={!isValid || isSubmitting} type="submit">Save</Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}

export default ChapterAccessForm
