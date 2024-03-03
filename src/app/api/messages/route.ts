// Imports
// ========================================================
import { QUERY_MESSAGES } from "@/server/db/queries/messages";

// Handlers
// ========================================================
/**
 * LIST
 * @param request 
 * @returns 
 */
export const GET = async (request: Request) => {
  const data = await QUERY_MESSAGES.LIST();

  return Response.json({ data });
}

/**
 * CREATE
 * @param request 
 */
export const POST = async (request: Request) => {
  const payload = await request.json();

  try {
    const data = await QUERY_MESSAGES.CREATE(payload);

    return Response.json({ data });
  } catch (error: any) {
    console.error({ error });
    return Response.json({ erorr: error?.message ?? error }, { status: 400 });
  }
}