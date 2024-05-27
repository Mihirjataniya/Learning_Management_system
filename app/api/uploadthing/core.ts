import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const handleauth = () => {
    const { userId } = auth()
    if(!userId) throw new Error("unauthorized")
    return {userId};
}

export const ourFileRouter = {
    courseImage : f({ image: { maxFileSize: "4MB",maxFileCount: 1 } })
    .middleware(()=>handleauth())
    .onUploadComplete(()=>{}),
    courseAttachments: f(["text","video","audio","pdf","image"])
    .middleware(()=>handleauth())
    .onUploadComplete(()=>{}),
    chapterVideo: f({ video: {maxFileSize: "512MB",maxFileCount: 1} })
    .middleware(()=>handleauth())
    .onUploadComplete(()=>{})
    
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;