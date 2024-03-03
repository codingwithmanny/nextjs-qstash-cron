// Imports
// ========================================================
import { QUERY_MESSAGES } from "@/server/db/queries/messages";

// Handlers
// ========================================================
/**
 * @dev Creates QStash schedule
 * @param request 
 */
export const POST = async (request: Request) => {
  const payload = await request.json();

  try {
    // 1. Create QStash schedule
    const schedule = await fetch(`${process.env.QSTASH_URL}${process.env.NEXT_PUBLIC_API_URL}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.QSTASH_TOKEN}`,
        "Content-Type": "application/json",
        "Upstash-Delay": `${payload.delay}`,
      },
      body: JSON.stringify(payload),
    });

    const message = await schedule.json();
    console.log({ message });

    // 2. Store in database
    const newMessage = await QUERY_MESSAGES.CREATE({
      jobId: message.messageId
    });

    return Response.json({ data: newMessage });
  } catch (error: any) {
    console.error({ error });
    return Response.json({ erorr: error?.message ?? error }, { status: 400 });
  }
}