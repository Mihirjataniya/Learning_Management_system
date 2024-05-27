import { getChapter } from "@/actions/getChapter";
import { Banner } from "@/components/banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/VideoPlayer";
import CourseEnrollButton from "./_components/CourseEnrollButton";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { CheckCircle, File } from "lucide-react";


async function ChapterIdpage({
    params
}: {
    params : {courseId: string; chapterId: string}
}) {

    const {userId} = auth()

    if(!userId){
        return redirect('/')
    }

    const {
        chapter,
        course,
        muxData,
        attachments,
        nextChapter,
        purchase
    } = await getChapter({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId
    })
    if(!chapter || !course){
        return redirect('/')
    }

    const isLocked = !chapter.isFree && !purchase

  return (
    <div>
      {isLocked && (
        <Banner  variant={'warning'} label="Please purchase the course to access this chapter." />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
            <VideoPlayer  
            chapterId={params.chapterId} 
            title={chapter.title}
            courseId = {params.courseId}
            nextChapterId = {nextChapter?.id}
            playbackId = {muxData?.playbackId!}
            isLocked = {isLocked}  />
        </div>
        <div>
          <div className="px-4 py-1 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">
              {chapter.title}
            </h2>
            {purchase ? (
              <div className="flex items-center bg-green-700 text-white p-2 rounded-lg gap-2">
                <CheckCircle className="w-4 h-4" />
                <p className="  text-sm">You have already enrolled this course</p>
              </div>
                
              ):(
                <CourseEnrollButton 
                courseId={params.courseId}
                price={course.price!}
                />
              )
              }
          </div>
          
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment)=>(
                  <a 
                  href={attachment.url}
                  target="_blank"
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-700 border text-sky-200 rounded-md hover:underline"
                  >
                    <File /> 
                    <p className="line-clamp-1 ">
                      {attachment.name}
                    </p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChapterIdpage
