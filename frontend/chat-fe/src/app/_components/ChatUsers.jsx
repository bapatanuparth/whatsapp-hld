import React from "react";
import { useUsersStore } from "../zustand/useUserStore";

const ChatUsers = () => {
  const { users } = useUsersStore();
  return (
    <div>
      {" "}
      {users.map((user, index) => (
        <div className="bg-slate-400 rounded-xl m-3 p-5">{user.username}</div>
      ))}
    </div>
  );
};

export default ChatUsers;
