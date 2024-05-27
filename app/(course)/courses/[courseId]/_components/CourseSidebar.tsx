import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { Chapter, Course } from "@prisma/client"
import { redirect } from "next/navigation"
import CourseSidebarItem from "./CourseSidebarItem"

interface CourseSidebarprops{
  course: Course & {
    chapters: Chapter[]
  }
}

async function CourseSidebar({
  course
}:CourseSidebarprops) {

  const {userId} = auth()
  if(!userId){
    return redirect('/')
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId:{
        userId,
        courseId: course.id
      }
    }
  })

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">
          {course.title}
        </h1>
        {/* check purchase */}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter)=>(
          <CourseSidebarItem key={chapter.id} id={chapter.id} label={chapter.title} courseId={course.id} isLocked={!chapter.isFree && !purchase}  />
        ))}
      </div>
    </div>
  )
}

export default CourseSidebar

