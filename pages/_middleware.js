import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function middleware(req){
    // Token will exist if the user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const {pathname} = req.nextUrl 
    // allow the reqeuests if the following is True..
    // 1) its a request for the next-auth session and provider fectching
    // 2) if the tokn exists
    if(pathname.includes('/api/auth') || token ){
        return NextResponse.next()
    }

    // redirect them to login if they dont have token and are requesting a protected route
    // following code is depracated, throws some url malfunctoin errors
    // if (!token && pathname !== '/login'){
    //     return NextResponse.redirect("/login");
    // }
    if (!token && pathname !== '/login'){
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.rewrite(url);
    }
}