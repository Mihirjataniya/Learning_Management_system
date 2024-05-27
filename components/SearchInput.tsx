'use client'

import { SearchIcon } from "lucide-react"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from 'query-string'

function SearchInput() {
    const [value,setValue] = useState("")
    const debouncedvalue = useDebounce(value)

    const searchparams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const currentCategoryId = searchparams.get("categoryId")

    useEffect(()=>{
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                title: debouncedvalue
            }
        }, {skipEmptyString: true,skipNull: true})
        router.push(url)
    },[debouncedvalue,currentCategoryId,router,pathname])

  return (
    <div className="relative ">
      <SearchIcon  className="h-4 w-4 absolute top-3 left-3 text-slate-500" />
    <Input 
    onChange={(e)=>setValue(e.target.value)}
    value={value}
    className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200" placeholder="Search for a course" />
    </div>  
  )
}

export default SearchInput
