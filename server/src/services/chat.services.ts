import { eq, and } from "drizzle-orm";
import { db } from "../db/db.js";
import { chatsTable, messagesTable } from "../db/schema.js";
import { contactSellerInput } from "../validators/chat.validator.js";
import { NotFoundError } from "../errors/index.js";

const contactSeller = async (
  contactSellerInput: contactSellerInput,
  userId: string,
) => {
  const { listingId, sellerId } = contactSellerInput;
  let chatId: string;
  let chat;
  [chat] = await db
    .select()
    .from(chatsTable)
    .where(
      and(
        eq(chatsTable.listingId, listingId),
        eq(chatsTable.sellerId, sellerId),
        eq(chatsTable.buyerId, userId),
      ),
    )
    .limit(1);
  if (!chat) {
    [chat] = await db
      .insert(chatsTable)
      .values({
        listingId,
        sellerId,
        buyerId: userId,
      })
      .returning();
  }
  chatId = chat.chatId;
  return chatId;
};

const getChatData = async (chatId: string) => {
  const [chat] = await db
    .select()
    .from(chatsTable)
    .where(eq(chatsTable.chatId, chatId));

  if (!chat) {
    throw new NotFoundError("Cannot find chat with provided id");
  }

  const chatData = await db.query.chatsTable.findFirst({
    where: (chatsTable, { eq }) => eq(chatsTable.chatId, chatId),
    with: {
      // Join 1: Get specific listing info
      listing: {
        columns: { listingId: true, title: true, price: true, imageUrls: true },
      },
      // Join 2 & 3: Get profiles for both parties
      buyer: {
        columns: { userId: true, username: true, avatarUrl: true },
      },
      seller: {
        columns: { userId: true, username: true, avatarUrl: true },
      },
    },
  });

  console.log("ChatData: ", chatData);

  const messages = await db
    .select()
    .from(messagesTable)
    .where(eq(messagesTable.chatId, chatId));

  console.log("messages: ", messages);

  return { chatData, messages };
};

export { contactSeller, getChatData };
