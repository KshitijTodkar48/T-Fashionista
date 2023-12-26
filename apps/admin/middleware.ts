import { NextRequest, NextResponse } from "next/server";
import { checkAuthorization } from "./utils/checkAuth";

export const middleware = async(req: NextRequest): Promise<NextResponse> => {
    if(req.url.includes("/api/admin/") || req.url.includes("/api/products/") || req.url.includes("/admin/addProduct") || 
       req.url.includes("/products/"))
    {
        return checkAuthorization(req);
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ["/api/admin/:path*", "/api/products/:path*", "/admin/addProduct", "/products/:path*"]
}