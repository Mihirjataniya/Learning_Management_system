"use client"

import { cn } from "@/lib/utils"
import { IconType } from "react-icons/lib"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from 'query-string'


interface CategoryItemProps {
    label: string
    value? :  string
    icon? : IconType
}


function CategoryItem({
    label,
    value,
    icon: Icon
}:CategoryItemProps) {
    const pathname = usePathname()
    const router = useRouter()
    const searchparams = useSearchParams()

    const currentCategoryId = searchparams.get('categoryId')
    const currentTitle = searchparams.get('title')
    const isSelected = currentCategoryId === value;

    const onCategory = () => {
       const url = qs.stringifyUrl({
        url: pathname,
        query:{
            title: currentTitle,
            categoryId: isSelected ? null : value
        }
       }, {skipNull: true , skipEmptyString: true} )

       router.push(url)
       
    }

  return (
    <button
    style={{
        boxShadow: '0 4px 4px rgba(40, 90, 160, 0.7)', 
      transition: 'box-shadow 0.3s ease', 
      }}
        onClick={onCategory}
        className={cn(
            "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
            isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
        )}
    > 
        {Icon && <Icon size={20}/> }
        <div className="truncate">
            {label}
        </div>
        </button>
  )
}

export default CategoryItem
