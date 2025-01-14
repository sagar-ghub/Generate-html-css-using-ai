import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
    const prisma = new PrismaClient()
    const { username,password,name } = await req.json();

    // return  NextResponse.json({ message: "Hello World" });
    try {
        const user = await prisma.user.findUnique({
            where: { email: username },
          });
          console.log(user)
          if(user)
          return NextResponse.json({ error:"User Exists" },{ status: 400 });
        await prisma.user.create({
            data: {
              email:username,
              password: password,
              name:name,
            },
          });
    return NextResponse.json({ message:"Successfully registered" });
    } catch (error) {
      return NextResponse.json({error:"Error Occured"+error },{ status: 400 });
    }
  
}