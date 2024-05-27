import { getDashboardCourses } from "@/actions/getDashboard";
import CoursesList from "@/components/CoursesList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {EmblaCarousel } from "@/components/EmblaCarouse"

export default async function Dashboard() {

  const { userId } = auth()

  if(!userId){
    return redirect('/')
  }

  const { allCourses } = await getDashboardCourses(userId)
 
  
  return (
    <div className="p-6 space-y-4">
      <EmblaCarousel />
        <h1 className="text-2xl font-extrabold ">Enrolled courses: </h1>
        <Separator />
      <CoursesList items={allCourses} />
    </div>
  );
}
