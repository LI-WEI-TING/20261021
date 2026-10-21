import { NextRequest } from "next/server";
import { error } from "@/utils/apiResponse";
import { BUSINESS_STATUS_CODE } from "@/config/constants";

export function withApiHandler(
  handler: (req: NextRequest) => Promise<Response>,
) {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (err: any) {
      console.error("API Error:", err);
      return Response.json(
        error(
          err.message || "Internal Server Error",
          BUSINESS_STATUS_CODE.ERROR,
        ),
        { status: 500 },
      );
    }
  };
}
