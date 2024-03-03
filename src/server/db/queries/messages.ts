// Imports
// ========================================================
import { db } from "../";
import { eq } from 'drizzle-orm';
import { messages } from "../schema";

// Types
// ========================================================
export interface Message {
  id: string;
  jobId?: string;
  message?: string;
  receivedAt?: string;
  createdAt: string;
}

// Query
// ========================================================
export const QUERY_MESSAGES = {
  /**
   * 
   * @returns 
   */
  LIST: async () => {
    return db.query.messages.findMany();
  },
  /**
   * 
   * @param payload 
   * @returns 
   */
  CREATE: async (payload: Omit<Message, 'id' | 'message' | 'receivedAt' | 'createdAt'>) => {
    const date = new Date();
    return db.insert(messages).values({
      ...payload,
      createdAt: date.toISOString(),
    } as Message).returning({ id: messages.id })
  },
  /**
   * 
   * @param id 
   * @returns 
   */
  READ: async (id: string) => {
    return db.query.messages.findFirst({
      where: eq(messages.id, id)
    });
  },
  /**
   * 
   * @param id 
   * @param payload 
   * @returns 
   */
  UPDATE: async (id: string, payload: Partial<Omit<Message, 'id' | 'receivedAt' | 'createdAt'>>) => {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    const isUUID = regexExp.test(id) ? true : false;
    const date = new Date();

    return db.update(messages).set({
      ...payload,
      receivedAt: date.toISOString(),
    })
    .where(isUUID ? eq(messages.id, id) : eq(messages.jobId, id))
    .returning({
      id: messages.id
    })
  },
  /**
   * 
   * @param id 
   * @returns 
   */
  DELETE: async (id: string) => {
    return db.delete(messages).where(eq(messages.id, id)).returning({ id: messages.id });
  }
};