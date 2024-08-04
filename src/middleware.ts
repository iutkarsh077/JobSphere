// import { auth } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./helpers/getCookie";
// export { auth } from "@/auth";

export const config = {
    matcher: ['/signup', '/login', '/', '/profile'],
  };

export async function middleware(request: NextRequest){
  const cookie = cookies();
  const getCarCookie = cookie.get("mycar")?.value;
  
  const url = request.nextUrl;
    // console.log("Url is: ", url)
    if(url.pathname.startsWith('/login') && getCarCookie){
        return NextResponse.redirect(new URL('/', request.url));
    }

    if(url.pathname.startsWith('/profile') && !getCarCookie){
      return NextResponse.redirect(new URL('/', request.url));
  }


  if(url.pathname.startsWith('/addJobs') && !getCarCookie){
    return NextResponse.redirect(new URL('/', request.url));
}

  if(url.pathname.startsWith('/addCars') && !getCarCookie){
    return NextResponse.redirect(new URL('/', request.url));
}

    else if(url.pathname.startsWith('/signup') && getCarCookie){
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
}