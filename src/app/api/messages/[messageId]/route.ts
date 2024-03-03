// Imports
// ========================================================
import { QUERY_MESSAGES } from "@/server/db/queries/messages";

// Handlers
// ========================================================
/**
 * READ
 * @param request 
 * @returns 
 */
export const GET = async (_request: Request, { params }: { params: { messageId: string } }) => {
  const { messageId } = params;
  console.log({ messageId })
  
  try {
    const data = await QUERY_MESSAGES.READ(messageId);
    console.log({ data });
    return Response.json({ data });
  } catch (error: any) {
    console.error({ error });
    return Response.json({ erorr: error?.message ?? error }, { status: 400 });
  }
}

/**
 * UPDATE
 * @param request 
 * @returns 
 */
export const PUT = async (request: Request, { params }: { params: { messageId: string } }) => {
  const { messageId } = params;
  const payload = await request.json();

  try {
    const data = await QUERY_MESSAGES.UPDATE(messageId, payload);

    return Response.json({ data });
  } catch (error: any) {
    console.error({ error });
    return Response.json({ erorr: error?.message ?? error }, { status: 400 });
  }
}

/**
 * DELETE
 * @param request 
 */
export const DELETE = async (_request: Request, { params }: { params: { messageId: string } }) => {
  const { messageId } = params;

  try {
    const data = await QUERY_MESSAGES.DELETE(messageId);

    return Response.json({ data });
  } catch (error: any) {
    console.error({ error });
    return Response.json({ erorr: error?.message ?? error }, { status: 400 });
  }
}