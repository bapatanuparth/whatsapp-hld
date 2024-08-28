"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Auth = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signUpFunc = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/signup",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.message === "Username already exists") {
        alert("Username already exists");
      } else {
        alert("msg sent");
        // router.push("/chat");
      }
    } catch (error) {
      console.log("Error in signup function : ", error.message);
    }
  };

  const loginFunc = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      alert("user logged in");
      // router.push("/chat");
    } catch (error) {
      console.log("Error in login function : ", error.message);
    }
  };

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div class="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                autocomplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex flex-row">
            <button
              onClick={signUpFunc}
              type="submit"
              class="flex w-1/2 m-3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
            <button
              onClick={loginFunc}
              type="submit"
              class="flex w-1/2 m-3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
