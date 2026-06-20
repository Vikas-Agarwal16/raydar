import { updateSiteStatus } from "@/lib/updateSiteStatus";

export async function GET() {
  try {
    const result = await updateSiteStatus("gate");
    return Response.json(result);
  } catch (err) {
    return Response.json(
      {
        error: err.message,
        cause: err.cause?.message || String(err.cause),
        code: err.cause?.code,
      },
      { status: 500 }
    );
  }
}