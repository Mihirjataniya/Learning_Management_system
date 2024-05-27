import { DataTable } from "./_components/DataTable"
import { columns } from "./_components/columns"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"


async function Coursespage() {
  const {userId} = auth()
  if(!userId){
    return redirect('/')
  }
  const courses = await db.course.findMany({
    where:{
      userId,
    },
    orderBy:{
      createdAt: "desc"
    }
  })
  return (
    <div className="p-6">
  
        <DataTable columns={columns} data={courses} />

    </div>
  )
}

export default Coursespage
