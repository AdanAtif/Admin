import prisma from '@/app/config/prismadb'


import {
    NextResponse
} from 'next/server';
import {
    headers
} from "next/headers";
const jwt = require('jsonwebtoken');


export async function POST(req:Request) {
    const {
        data,Color,Size,Category
    } = await req.json();
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
                              if (data.name ||data.image|| data.price|| data.stock ||Color || Size || Category) {
                                const price = parseInt(data.price, 10);
                                const stock = parseInt(data.stock, 10);
        
                                const product = await prisma.products.create({
                                    data: {
                                        name: data.name,
                                        image: data.image,
                                        price: price,
                                        stock: stock,
                                        Color,
                                        Size,
                                        Category
                                    }
                                });

                                  return NextResponse.json({
                                    status: "success",   
                                });

                              } else {
                                return NextResponse.json({
                                    status: "Failed",
                                    message: "please fill all the fields"
                                });
                              }
                             
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
