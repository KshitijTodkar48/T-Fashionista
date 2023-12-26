import { NextRequest, NextResponse } from "next/server";
import { checkAuthorization } from "./utils/checkAuth";

export const middleware = async(req: NextRequest): Promise<NextResponse> => {
    if(req.url.includes("/api/users/") || req.url.includes("/api/products/addToCart") || req.url.includes("/api/products/removeFromCart") || 
       req.url.includes("/users/cart") || req.url.includes("/users/orders"))
    {
        return checkAuthorization(req);
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ["/api/users/:path*", "/api/products/addToCart", "/api/products/removeFromCart", "/users/cart/:path*", "/users/orders"]
}