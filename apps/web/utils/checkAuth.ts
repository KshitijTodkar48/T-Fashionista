import { NextRequest, NextResponse } from "next/server";
import { tokenName } from "./constants";

export const checkAuthorization = async(req: NextRequest): Promise<NextResponse> => {
    const sessionToken = req.cookies.get(tokenName);
    if (sessionToken) {
        return NextResponse.next();
    }
    return new NextResponse("Unauthorized.", { status: 401 });
};