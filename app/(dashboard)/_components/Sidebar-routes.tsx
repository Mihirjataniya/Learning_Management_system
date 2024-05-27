"use client"

import { Compass, Layout, List, icons } from "lucide-react"
import Sidebaritem from "./Sidebar-item"
import { usePathname } from "next/navigation"

const  GuestRoutes = [
    {
        icon:  Layout,
        label: "Dashboard",
        href: "/"
    },{
        icon: Compass,
        label: "Browse" ,
        href: '/search'
    }
]

const TeacherRoutes = [
  {
    icon: List,
    label : "Course",
    href: "/teacher/courses"
  }
]

function Sidebarroutes() {
  const pathname = usePathname()
  const isteacher = pathname?.includes("/teacher")
  const routes = isteacher? TeacherRoutes : GuestRoutes
  return (
    <div className="flex flex-col w-full">
      {routes.map((route)=>(
        <Sidebaritem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
        />
      ))}
    </div>
  )
}

export default Sidebarroutes
