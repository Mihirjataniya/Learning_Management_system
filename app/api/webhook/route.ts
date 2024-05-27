import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"



export async function POST(req: Request) {
    const body = await req.text()
    const signature = headers().get("Stripe-Signature") as string

    let event: Stripe.Event

    try{
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    }catch(error){
        console.log(error)
        return new NextResponse("Webhook error",{status:500})
    }

    const session = event.data.object as Stripe.Checkout.Session
    const userId = session?.metadata?.userId
    const courseId = session?.metadata?.courseId

    if(event.type == 'checkout.session.completed'){
        if(!userId || !courseId){
            return new NextResponse("Meta data missing in webhook" , {status:404})
        }
        console.log(userId)
        console.log(courseId)
        const response = await db.purchase.create({
            data: {
                courseId: courseId,
                userId: userId
            }
        })
        console.log("Responseeeee" +response)
    }else{
        return new NextResponse("Unhandled event in web hook",{status:200})
    }

    return new NextResponse(null,{status:200})

}