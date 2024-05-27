import Image from "next/image"
import Link from "next/link"
import { IconBadge } from "./IconBadge"
import { BookOpen, CheckCircle } from "lucide-react"
import { formatPrice } from "@/lib/format"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

interface CourseCardProps{
    id:string,
    title: string,
    imageUrl: string 
    chaptersLength: number 
    price: number 
    category: string 
}

async function CourseCard({
    id,
    title,
    imageUrl,
    chaptersLength,
    price,
    category
}:CourseCardProps) {
    const {userId} = auth()
    if(!userId){
        return redirect('/')
    }
    const purchase = await db.purchase.findUnique({
        where:{
            userId_courseId: {
                userId: userId,
                courseId: id
            }
        }
    })
    console.log()
  return (
    <Link href={`/courses/${id}`}>
     <div
    style={{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', 
      transition: 'box-shadow 0.3s ease', 
    }}
    className="transition overflow-hidden border rounded-lg p-3 h-full"
  >
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image fill className="object-cover" alt={title} src={imageUrl} />
      </div>
      <div className="flex flex-col pt-2">
        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
          {title}
        </div>
        <p className="text-xs text-mute-foreground text-slate-600">
          {category}
        </p>
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <IconBadge size={'sm'} icon={BookOpen} />
            <span>{chaptersLength} {chaptersLength == 1 ? 'chapter' : 'chapters'}</span>
          </div>
        </div>
        {!purchase ? (
          <h1 className="text-center bg-black text-white p-2 rounded-lg gap-2 text-sm">{formatPrice(price)}</h1>
        ) : (
          <h1 className="text-center bg-green-700 text-white p-2 rounded-lg gap-2 text-sm">Access the course</h1>
        )}
      </div>
    </div>
  </Link>
  
  )
}

export default CourseCard
