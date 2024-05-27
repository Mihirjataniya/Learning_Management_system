import NavbarRoutes from "@/components/NavbarRoutes"
import { Chapter, Course } from "@prisma/client"
import CourseMobileSidebar from "./CourseMobileSidebar"

interface CourseNavbarprops{
    course: Course & {
        chapters: Chapter[]
    }
}

function CourseNavbar({
    course
}:CourseNavbarprops) {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar
        course={course}
      />
      <NavbarRoutes />
    </div>
  )
}

export default CourseNavbar
