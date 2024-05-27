"use client"
import { UploadDropzone } from "@/lib/uploadthing"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import { Url } from "next/dist/shared/lib/router/router"
import { error } from "console"
import toast from "react-hot-toast"

interface FileUploadProps {
    onChange: (Url? :  string) => void
    endpoint: keyof typeof ourFileRouter
}



export function FileUpload({
    onChange,
    endpoint
}:FileUploadProps) {
  return (
    <div>
      <UploadDropzone endpoint={endpoint}
        onClientUploadComplete={(res)=> {
            onChange(res?.[0].url)
        }}
        onUploadError={(error: Error)=>{
            console.log(error)
            toast.error("Something went wrong")
        }}
      />

    </div>
  )
}

export default FileUpload
