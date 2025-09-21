"use server"

import { getMyToken } from "@/utilities/token"
import axios from "axios"
import { headers } from "next/headers"

 export async function clearCartAction(id: string, count:number){
const token = await getMyToken()
if(!token){
    throw Error("Login First")
}
const value = {
    count: count
}
const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` ,{ 
    headers:{
        token : token as string
    }
 })
 return data

}