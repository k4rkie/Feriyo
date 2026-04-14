import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import {
  PaperAirplaneIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

type ChatData = {
  listingId: string;
  sellerId: string;
  chatId: string;
  createdAt: Date;
  buyerId: string;
  listing: {
    listingId: string;
    title: string;
    price: number;
    imageUrls: string[];
  };
  buyer: {
    userId: string;
    username: string;
    avatarUrl: string | null;
  };
  seller: {
    userId: string;
    username: string;
    avatarUrl: string | null;
  };
};

type Message = {
  messageId: string;
  chatId: string;
  senderId: string;
  content: string | null;
  createdAt: Date;
};

function Chats() {
  const { chatId } = useParams();
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  if (!auth.isAuthLoading && !auth.user) {
    <Navigate to="/login" replace />;
  }

  useEffect(() => {
    if (chatId && !auth.isAuthLoading) {
      async function fetchChatData() {
        setIsLoading(true);
        const BASE_URL: string = import.meta.env.VITE_BASE_BACKEND_URL;
        const endPoint = `api/chats/${chatId}`;
        const url = new URL(endPoint, BASE_URL);
        try {
          const response = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          });
          const result = await response.json();
          setChatData(result.data.chatData);
          setMessages(result.data.messages);
        } catch (error) {
          setIsLoading(false);
        } finally {
          setIsLoading(false);
        }
      }
      fetchChatData();
    }
  }, [chatId, auth.isAuthLoading]);

  // Dummy data for chats
  const chatList = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, is the item still available?",
      time: "2m",
      online: true,
    },
    {
      id: 2,
      name: "Sarah Smith",
      lastMessage: "I can meet tomorrow at 10 AM.",
      time: "1h",
      online: false,
    },
    {
      id: 3,
      name: "Mike Johnson",
      lastMessage: "Thanks!",
      time: "3h",
      online: true,
    },
    {
      id: 4,
      name: "Emma Wilson",
      lastMessage: "Would you take $50?",
      time: "1d",
      online: false,
    },
    {
      id: 5,
      name: "David Brown",
      lastMessage: "Sent the payment.",
      time: "2d",
      online: true,
    },
    {
      id: 6,
      name: "Lisa Anderson",
      lastMessage: "Is the price negotiable?",
      time: "3d",
      online: false,
    },
  ];

  // const messages = [
  //   {
  //     id: 1,
  //     sender: "them",
  //     text: "Hi! Is the mountain bike still available?",
  //     time: "10:30 AM",
  //   },
  //   {
  //     id: 2,
  //     sender: "me",
  //     text: "Yes, it is! Are you interested in taking a look?",
  //     time: "10:32 AM",
  //   },
  // ];

  if (isLoading) {
    <div className="flex-1 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2ACFCF]"></div>
      <span className="ml-3 text-[#6F767E]">Loading conversation...</span>
    </div>;
  }

  return (
    <div className="flex h-full w-full bg-[#111111] overflow-hidden text-[#E5E5E5]">
      {/* Sidebar - Chat List */}
      <div className="w-80 border-r border-[#2A2A2A] flex flex-col bg-[#111111]">
        <div className="p-4 border-b border-[#2A2A2A]">
          <h1 className="text-xl font-bold mb-4">Messages</h1>
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#6F767E]" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full bg-[#181818] border border-[#2A2A2A] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#414141] transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {chatList.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center gap-3 p-4 hover:bg-[#181818] cursor-pointer transition-colors border-b border-[#181818]"
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center font-semibold text-lg border border-[#3A3A3A]">
                  {chat.name.charAt(0)}
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#111111] rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="font-semibold truncate">{chat.name}</h3>
                  <span className="text-xs text-[#6F767E]">{chat.time}</span>
                </div>
                <p className="text-sm text-[#A1A1A1] truncate">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Window */}
      {chatId ? (
        <div className="flex-1 flex flex-col bg-[#0D0D0D]">
          {chatData ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-[#2A2A2A] flex items-center justify-between bg-[#111111]">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      chatData.seller.avatarUrl || chatData.seller.username,
                    )}&background=4f46e5&color=fff&size=128`}
                    alt="Profile"
                    className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center font-semibold text-lg border border-[#3A3A3A]"
                  />
                  <div>
                    <Link
                      to={`/user/${chatData.seller.userId}`}
                      className="font-semibold cursor-pointer"
                    >
                      {chatData.seller.username}
                    </Link>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-500 font-medium">
                        Online
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 custom-scrollbar">
                {/*
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl p-3 px-4 text-sm shadow-sm ${
                    msg.sender === "me"
                      ? "bg-[#2ACFCF] text-[#111111] rounded-tr-none font-medium"
                      : "bg-[#2A2A2A] text-[#E5E5E5] rounded-tl-none border border-[#3A3A3A]"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`text-[10px] block mt-1.5 ${
                      msg.sender === "me"
                        ? "text-[#111111]/70"
                        : "text-[#6F767E]"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          */}
              </div>

              {/* Input Area */}
              <div className="flex gap-3 p-4 bg-[#111111] border-t border-[#2A2A2A]">
                <input
                  type="text"
                  placeholder="Write a message..."
                  className="w-full bg-[#181818] border border-[#2A2A2A] rounded-xl px-4 py-2.5 focus-within:border-[#414141] transition-all placeholder:text-[#6F767E]"
                />
                <button className="p-2 bg-[#2ACFCF] hover:bg-[#26BABA] rounded-lg transition-all active:scale-95 group">
                  <PaperAirplaneIcon className="w-5 h-5 text-[#111111]" />
                </button>
              </div>
            </>
          ) : (
            /* Loading State */
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2ACFCF]"></div>
              <span className="ml-3 text-[#6F767E]">
                Loading conversation...
              </span>
            </div>
          )}
        </div>
      ) : (
        /* Empty State (No Chat Selected) */
        <div className="flex w-full h-full justify-center items-center flex-col gap-3">
          <ChatBubbleLeftRightIcon className="w-20 h-20 text-[#2A2A2A]" />
          <h3 className="text-4xl font-bold">Messages</h3>
          <p className="text-xl text-[#6F767E]">Your messages appear here.</p>
        </div>
      )}
    </div>
  );
}

export default Chats;
