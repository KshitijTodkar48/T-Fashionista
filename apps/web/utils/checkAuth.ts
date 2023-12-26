import { NextRequest, NextResponse } from "next/server";

export const checkAuthorization = async(req: NextRequest): Promise<NextResponse> => {
    const sessionToken = req.cookies.get("next-auth.session-token");
    if (sessionToken) {
        return NextResponse.next();
    }
    return new NextResponse("Unauthorized.", { status: 401 });
};