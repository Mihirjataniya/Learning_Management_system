'use client'

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

interface CourseEnrollButtonProps {
    courseId: string,
    price: number
}

function CourseEnrollButton({
    courseId,
    price
}:CourseEnrollButtonProps) {

    const [isLoading,setIsLoading] = useState(false)
    
    const onPay = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post(`/api/courses/${courseId}/checkout`)
            console.log(response.data.url)
            window.location.assign(response.data.url)
        } catch (error) {
            toast.error("Something went wrong")
        }finally{
            setIsLoading(false)
        }
    }

  return (
      <Button
        onClick={onPay}
        disabled={isLoading}
      size={'sm'} 
       className="w-full md:w-auto">
        Enroll For {formatPrice(price)}
      </Button>
  )
}

export default CourseEnrollButton
