import { Chapter, Course } from "@prisma/client"
import { Sheet,SheetContent,SheetTrigger } from "@/components/ui/sheet"
import CourseSidebar from "./CourseSidebar"
import { Menu } from "lucide-react"


interface CourseMobileSidebarProps{
    course: Course & {
        chapters: Chapter[]
    }
}

function CourseMobileSidebar({
    course
}:CourseMobileSidebarProps) {
  return (
   <Sheet>
    <SheetTrigger  className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
    </SheetTrigger> 
    <SheetContent side={'left'} className="p-0 bg-white w-72">
        <CourseSidebar course={course} />
    </SheetContent>
   </Sheet>
  )
}

export default CourseMobileSidebar
