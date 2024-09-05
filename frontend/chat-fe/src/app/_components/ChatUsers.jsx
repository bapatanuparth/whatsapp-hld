import React, { useEffect } from "react";
import { useUsersStore } from "../zustand/useUserStore";
import { useChatReceiverStore } from "../zustand/useChatReceiverStore";
import { useChatMsgsStore } from "../zustand/useChatMsgStore";
import axios from "axios";
import { useAuthStore } from "../zustand/useAuthStore";

const ChatUsers = () => {
  const { users } = useUsersStore();
  const { authName } = useAuthStore();
  const { chatReceiver, updateChatReceiver } = useChatReceiverStore();
  const { updateChatMsgs } = useChatMsgsStore();

  const setChatReceiver = (user) => {
    updateChatReceiver(user.username);
  };

  useEffect(() => {
    const getMsgs = async () => {
      let res = await axios.get(
        "http://localhost:8081/msgs",
        {
          params: {
            sender: authName,
            receiver: chatReceiver,
          },
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.length !== 0) {
        console.log(res.data);
        updateChatMsgs(res.data);
      } else {
        updateChatMsgs([]);
      }
    };
    if (chatReceiver) {
      getMsgs();
    }
  }, [chatReceiver]);
  return (
    <div>
      {" "}
      {users.map((user, index) => (
        <div
          onClick={() => setChatReceiver(user)}
          className="bg-slate-400 rounded-xl m-3 p-5"
        >
          {user.username}
        </div>
      ))}
    </div>
  );
};

export default ChatUsers;
