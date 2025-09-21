"use server"
import { getMyToken } from "@/utilities/token"


export async function getUserCartAction(){
    const token = await getMyToken()
    if(!token){
        return null
    }
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart",{
        headers: {
            token: token as string
        }
    })
    const data = await response.json()
    return data
}