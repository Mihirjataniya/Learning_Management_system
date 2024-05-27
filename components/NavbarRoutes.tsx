"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname  } from "next/navigation"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"
import SearchInput from "./SearchInput"

function NavbarRoutes() {
    const pathname = usePathname()
    const isTeacherpage = pathname?.startsWith('/teacher')
    const isPlayerpage = pathname?.startsWith('/courses')
    const isSearchpage = pathname === '/search'

  return (
    <>
    {isSearchpage && (
      <div className="hidden md:block">
        <SearchInput />
      </div>
    )}
    <div className="flex gap-x-2 ml-auto">
        {isTeacherpage || isPlayerpage ? (
          <Link href={'/'}>
            <Button size={"sm"} variant={"ghost"} className="border border-gray-400" ><LogOut className="h-4 w-4 mr-2" />Exit</Button>
          </Link>
        ): (
            <Link href={'/teacher/courses'}>
                <Button size={"sm"} variant={"ghost"} className="border border-gray-400">Teacher Mode</Button>
            </Link>
        )}
      <UserButton afterSignOutUrl="/" />
    </div>
    </>
  )
}

export default NavbarRoutes
