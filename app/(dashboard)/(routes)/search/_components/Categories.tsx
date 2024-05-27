"use client"

import { Category } from "@prisma/client"
import { GiOpenBook } from "react-icons/gi";
import CategoryItem from "./CategoryItem"



interface CategoriesProps {
    items: Category[]
}


function Categories({
    items
}: CategoriesProps) {

  return (
    <div  className="flex items-center gap-x-2 overflow-x-auto pb-4">
      {items.map((item)=>(
        <CategoryItem key={item.id} label={item.name} icon={GiOpenBook} value={item.id} />
      ))}
    </div>
  )
}

export default Categories
