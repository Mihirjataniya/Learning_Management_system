import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { use } from "react"

export async function POST(
    req: Request,
    { params } : {params: {courseId: string}}
) {
    try {
        const {userId} = auth()
        const {title} = await req.json()

        if(!userId){
            return new NextResponse("Unauthorised",{status:401})
        }
        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        })
        if(!courseOwner){
            return new NextResponse("Unauthorised",{status:401})
        }

        const lastchapter =  await db.chapter.findFirst({
            where:{
                courseId: params.courseId
            },
            orderBy:{
                position: 'desc'
            }
        })

        const newPosition = lastchapter?  lastchapter.position + 1 : 1;

        const Chapter = await db.chapter.create({
            data:{
                title,
                courseId: params.courseId,
                position: newPosition
            }
        })

        return NextResponse.json(Chapter)

    } catch (error) {
        console.log("While adding chapters   "+error)
        return new NextResponse("Internal Error",{status:500})
    }
}