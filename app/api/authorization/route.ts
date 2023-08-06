import prisma from '@/app/config/prismadb'


import {
    NextResponse
} from 'next/server';
import {
    headers
} from "next/headers";
const jwt = require('jsonwebtoken');


export async function POST(req:Request) {
    const headersList = headers();
    const referer = await headersList.get("authorization");
    let token
            if (referer && referer.startsWith('Bearer')) {
                token = referer.split(' ')[1]
                console.log("token",token);
                try {
                    const jwtid = await jwt.verify(token, "ewijoewjoiejfojewjfoewjfofoj")
                    console.log("jwtid",jwtid);
                    if (jwtid) {
                        const user = await prisma.adminuser.findUnique({
                            where: {
                              email: jwtid.email,
                            },
                          });
                        if (user) {
                                return NextResponse.json({
                                    status: "success",
                                    user: user 
                                });
                             
                        } else {
                            return NextResponse.json({
                                status: "Failed",
                                message: "Email is not registored"
                            });
                        }
                         
                    } else {
                        return NextResponse.json({
                            status: "Failed",
                            message: `Unautherized User 1`
                        });
                    }     
                } catch (error:any) {
                    console.log("------------------------------------");
                    console.log("error",error.message);
                    console.log("------------------------------------");
                    return NextResponse.json({
                        status: "Failed",
                        message: `Unautherized User 1`
                    });
                }
                      
            } else {
                return NextResponse.json({
                    status: "Failed",
                    message: `Unautherized User`
                });
            }
        }
