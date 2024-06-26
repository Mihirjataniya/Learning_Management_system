import { Category,Course } from "@prisma/client";
import CourseCard from "./CourseCard";

type CourseWithCategory =   Course & {
    category: Category | null ,
    chapters: {id: string}[]
}

interface CoursesListProps{
    items: CourseWithCategory[]
}

function CoursesList({
    items
}:CoursesListProps) {
  return (
    <div>
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item)=>(
        <CourseCard
            key={item.id}
            id = {item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength= {item.chapters.length}
            price={item.price!}
            category={item?.category?.name!}
        />
      ))}
      {items.length == 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">No courses found</div>
      )} 
    </div>
 </div>

  )
}

export default CoursesList
