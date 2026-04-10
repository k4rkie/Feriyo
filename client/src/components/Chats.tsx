import { XMarkIcon } from "@heroicons/react/24/outline";

type ChatUser = {
  userId: number;
  username: string;
  avatar: string;
  lastMessage?: string;
  timestamp?: string;
};

type Props = {
  isChatOpen: boolean;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Chats({ isChatOpen, setIsChatOpen }: Props) {
  const chats: ChatUser[] = [];

  return (
    <>
      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="w-96 h-112 bg-[#111111] border border-[#2A2A2A] rounded-lg shadow-lg flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
              <h2 className="text-lg font-semibold text-[#E5E5E5]">Messages</h2>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1 hover:bg-[#2A2A2A] rounded-md transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-[#A1A1A1] hover:text-[#E5E5E5]" />
              </button>
            </div>

            {/* Chats List */}
            <div className="flex-1 overflow-y-auto">
              {chats.length > 0 ? (
                <div className="divide-y divide-[#2A2A2A]">
                  {chats.map((chat) => (
                    <a
                      key={chat.userId}
                      href={`/chats/${chat.userId}`}
                      className="flex items-center justify-end gap-3 p-4 hover:bg-[#181818] transition-colors cursor-pointer"
                    >
                      {/* Profile Picture */}
                      <img
                        src={chat.avatar}
                        alt={chat.username}
                        className="w-12 h-12 rounded-full shrink-0 border border-[#2A2A2A]"
                      />

                      {/* Chat Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[#E5E5E5] font-medium truncate">
                          {chat.username}
                        </p>
                        <p className="text-[#A1A1A1] text-sm truncate">
                          {chat.lastMessage || "No messages yet"}
                        </p>
                      </div>

                      {/* Timestamp */}
                      <span className="text-[#6F767E] text-xs flex-shrink-0">
                        {chat.timestamp}
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-[#A1A1A1]">
                  No chats yet
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chats;
