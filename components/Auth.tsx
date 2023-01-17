import { useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";
import { LockClosedIcon } from "@heroicons/react/solid";

const cookie = new Cookie();

export default function Auth() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const processing = useRef(false);

  const login = async (): Promise<void> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/auth/jwt/create/`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 400) {
        throw "authentication failed";
      } else if (response.ok) {
        const responseData = await response.json();
        const options = { path: "/" };
        cookie.set("access_token", responseData.access, options);
        router.push("/main-page");
      }
    } catch (error) {
      alert(error);
    }
  };

  const authUser = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (processing.current) return;
    processing.current = true;
    if (isLoginMode) {
      login();
    } else {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/register/`, {
          method: "POST",
          body: JSON.stringify({ username: username, password: password }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 400) {
          throw "authentication failed";
        }
        login();
      } catch (err) {
        alert(err);
      }
    }
    processing.current = false;
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          {isLoginMode ? "Login" : "Sign Up"}
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={authUser}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="text-sm">
            <span
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="cursor-pointer font-medium text-white hover:text-indigo-500"
            >
              Change Mode
            </span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            {isLoginMode ? "Login with JWT" : "Create New User"}
          </button>
        </div>
      </form>
    </div>
  );
}
