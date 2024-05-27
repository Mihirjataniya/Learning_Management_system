import { Category, Course } from "@prisma/client";
import { db } from "@/lib/db";

type getCourses = {
    userId: string
    title? : string
    categoryId? : string
}

export const getCourses = async ({
    userId,
    title,
    categoryId
}:getCourses) =>  {
    try {
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title:{
                    contains: title 
                },
                categoryId
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true
                    },
                    select: {
                        id: true
                    }
                },
                purchases: {
                    where: {
                        userId
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return courses        

    } catch (error) {
        console.log("Get courses "+error)
        return []
    }   
}