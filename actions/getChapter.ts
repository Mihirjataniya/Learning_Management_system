import { db } from "@/lib/db"
import { Attachment, Chapter } from "@prisma/client"
import { error } from "console"


interface getChapterProps{
    userId : string
    courseId: string
    chapterId: string
}

export const getChapter = async ({
    userId,
    courseId,
    chapterId
}:getChapterProps) => {
    try {
        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId : {
                    userId,
                    courseId: courseId
                }
            }
        })
        const course = await db.course.findUnique({
            where: {
                isPublished: true,
                id: courseId
            },select: {
                price: true
            }
        })

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true
            }
        })

        if(!course || !chapter){
            throw new Error("Course/chapter not found")
        }

        let muxData = null
        let attachments: Attachment[] = []
        let nextChapter: Chapter | null = null

        if(purchase){
            attachments = await db.attachment.findMany({
                where: {
                    courseId: courseId
                }
            })
        }

        if(chapter.isFree || purchase){
            muxData = await db.muxData.findUnique({
                where: {
                    chapterId: chapterId
                }
            })
            nextChapter = await db.chapter.findFirst({
                where: {
                    courseId: courseId,
                    isPublished: true,
                    position: {
                        gt: chapter?.position
                    }
                },
                orderBy:{
                    position: 'asc'
                }
            })
        }

        return {
            chapter,
            course,
            muxData,
            attachments,
            nextChapter,
            purchase
        }

    } catch (error) {
        console.log("Getting chapters"+error)
        return {
            chapter: null,
            course: null,
            muxData: null,
            attachments: [],
            nextChapter: null,
            purchase: null
        }
    }
}