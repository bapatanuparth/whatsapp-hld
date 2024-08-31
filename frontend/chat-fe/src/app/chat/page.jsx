"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuthStore } from "../zustand/useAuthStore";
import { useUsersStore } from "../zustand/useUserStore";
import axios from "axios";
import ChatUsers from "../_components/ChatUsers";

const Chat = () => {
  const [msgs, setMsgs] = useState([]);
  const [msg, setMsg] = new useState("");
  const [socket, setSocket] = new useState(null);
  const { authName } = useAuthStore();
  const { updateUsers } = useUsersStore();

  useEffect(() => {
    console.log(authName);
    const newsocket = io("http://localhost:8081", {
      query: {
        username: authName,
      },
    });
    setSocket(newsocket);

    newsocket.on("chat msg", (msgrecv) => {
      console.log("received msg on client " + msgrecv);
      setMsgs((prevMsgs) => [
        ...prevMsgs,
        { text: msgrecv, sentByCurrUser: false },
      ]);
    });

    const getUserData = async () => {
      const res = await axios.get("http://localhost:5000/users", {
        withCredentials: true,
      });
      console.log(res.data);
      updateUsers(res.data);
    };
    getUserData();
    return () => newsocket.close();
  }, []);

  const sendMsg = (e) => {
    console.log("buton presses");
    e.preventDefault();
    const newMsg = {
      text: msg,
      sender: authName,
      receiver: "amit",
    };
    if (socket) {
      socket.emit("chat msg", newMsg);
      setMsgs((prevMsgs) => [...prevMsgs, { text: msg, sentByCurrUser: true }]);
      setMsg("");
    }
  };

  return (
    <div className="h-screen flex divide-x-4">
      <div className="w-1/5">
        <ChatUsers></ChatUsers>
      </div>
      <div className="w-4/5 h-screen flex flex-col">
        <div className="h-1/5">
          <h1>{authName} is chatting with Recevier</h1>
        </div>
        <div className="msgs-container h-3/5 overflow-scroll">
          {msgs.map((msg, index) => (
            <div
              key={index}
              className={` m-3 ${
                msg.sentByCurrUser ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`${
                  msg.sentByCurrUser ? "bg-blue-200" : "bg-green-200"
                } p-3 rounded-lg`}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1/5 flex items-center justify-center">
          <form onSubmit={sendMsg} class="w-1/2">
            <div class="relative">
              <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type your text here"
                required
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
