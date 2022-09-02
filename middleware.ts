import {withAuth} from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server";
export const config = { matcher: ["/secret"] }


export default withAuth(
function middleware(req) {
    return NextResponse.rewrite(new URL('/secret',req.url))
},{
callbacks:{
    authorized({req}){
        const sessionToken = (req.cookies.get('next-auth.session-token'))
        if(sessionToken) {
            return true
        } 
        return false
    }
    
},
pages: {
    signIn: '/login',
    error: '/api/auth/error',
  }
}

);
