// Imports
// ========================================================
import { QUERY_MESSAGES } from "@/server/db/queries/messages";
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";
import { NextRequest, NextResponse } from "next/server";

// Handlers
// ========================================================
const handler = async (request: NextRequest) => {
  const headers = request.headers;
  const payload = await request.json();

  // 1. Output payload result for logs
  console.group("Payload");
  console.log({ payload });
  console.groupEnd();

  // 2. Output headers result for logs
  console.group("Headers");
  console.log({ userAgent: headers.get("user-agent") });
  console.log({ contentType: headers.get("content-type") });
  console.log({ upstashTopicName: headers.get("upstash-topic-name") });
  console.log({ upstashSignature: headers.get("upstash-signature") });
  console.log({ upstashRetried: headers.get("upstash-retried") });
  console.log({ upstashMessageId: headers.get("upstash-message-id") });
  console.log({ upstashScheduleId: headers.get("upstash-schedule-id") });
  console.log({ upstashCallerIp: headers.get("upstash-caller-ip") });
  console.groupEnd();

  // 3. Store in database
  await QUERY_MESSAGES.UPDATE(
    `${headers.get("upstash-message-id")}`,
    {
      message: JSON.stringify(payload),
    }
  );

  return NextResponse.json({ payload });
};

// Exports
// ========================================================
export const POST = verifySignatureAppRouter(handler);
