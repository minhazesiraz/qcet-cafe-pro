"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Controls() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  //   const pathColor_One = "#2b7fff"; // bg-blue-500
  const pathColor_One = "#ffb300";
  const pathColor_Two = "#1447e6"; // bg-blue-700

  const getClass = (mode) => {
    const isActive = theme === mode;
    return `${
      isActive ? "bg-blue-400" : "bg-blue-100"
    } inline-flex h-0 w-0 translate-y-2 items-center justify-center gap-2 self-center justify-self-center overflow-hidden whitespace-nowrap rounded px-6 text-sm font-medium tracking-wide text-blue-500 opacity-0 transition delay-[0.15s] duration-300 hover:bg-blue-400 hover:text-blue-700 focus:bg-blue-400 focus:text-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-100 disabled:text-blue-400 disabled:shadow-none group-hover:h-12 group-hover:w-12 group-hover:translate-y-0 group-hover:opacity-100 }`;
  };

  //   className="inline-flex h-0 w-0 translate-y-2 items-center justify-center gap-2 self-center justify-self-center overflow-hidden whitespace-nowrap rounded bg-blue-50 px-6 text-sm font-medium tracking-wide text-blue-500 opacity-0 transition delay-[0.05s] duration-300 hover:bg-blue-100 hover:text-blue-600 focus:bg-blue-200 focus:text-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-100 disabled:text-blue-400 disabled:shadow-none group-hover:h-12 group-hover:w-12 group-hover:translate-y-0 group-hover:opacity-100"

  //    className={`${
  //     currentTheme === "dark" ? "text-red-600" : "text-green-500"
  //   }`}

  return (
    <>
      <div className="fixed bottom-4 right-4 z-10">
        <div className="group flex flex-col-reverse gap-2">
          <button className="group relative z-50 inline-flex h-12 items-center justify-center gap-2 self-center whitespace-nowrap rounded bg-blue-500 px-6 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-600 focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none">
            <span className="relative transition duration-300 only:-mx-6 group-hover:rotate-45">
              <span className="sr-only">plus</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
                aria-label="Plus icon"
                role="graphics-symbol"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </span>
          </button>
          <button onClick={() => setTheme("dark")} className={getClass("dark")}>
            <span className="relative only:-mx-6">
              <span className="sr-only">black mode</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={pathColor_Two}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
                aria-label="camera icon"
                role="graphics-symbol"
              >
                <path
                  d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20 L12,4 C16.418278,4 20,7.581722 20,12 C20,16.418278 16.418278,20 12,20 Z"
                  stroke={pathColor_Two}
                ></path>
              </svg>
            </span>
          </button>
          <button
            onClick={() => setTheme("light")}
            className={getClass("light")}
          >
            <span className="relative only:-mx-6">
              <span className="sr-only">white mode</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 1024 1024"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
                aria-label="camera icon"
                role="white"
              >
                <path
                  d="M773.8 414.3V313.5h-80.5v-97.1H333.4v97.1h-80.6v100.8H167v204.6h85.8v102.3h80.6v102.3h359.9V721.2h80.5V618.9h85.8V414.3zM477.8 55.2H552v74.2h-74.2zM477.8 897.7H552v74.2h-74.2zM859.6 129.4h74.2v74.2h-74.2zM859.6 823.5h74.2v74.2h-74.2zM92.9 129.4h74.2v74.2H92.9zM92.9 823.5h74.2v74.2H92.9zM18.7 463.6h74.2v74.2H18.7zM933.7 463.6h74.2v74.2h-74.2z"
                  fill={pathColor_One}
                />
              </svg>
            </span>
          </button>
          <button
            onClick={() => setTheme("system")}
            className={getClass("system")}
          >
            <span className="relative only:-mx-6">
              <span className="sr-only">default mode</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 48 48"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
                aria-label="camera icon"
                role="settings"
              >
                <path
                  d="M36.686 15.171C37.9364 16.9643 38.8163 19.0352 39.2147 21.2727H44V26.7273H39.2147C38.8163 28.9648 37.9364 31.0357 36.686 32.829L40.0706 36.2137L36.2137 40.0706L32.829 36.686C31.0357 37.9364 28.9648 38.8163 26.7273 39.2147V44H21.2727V39.2147C19.0352 38.8163 16.9643 37.9364 15.171 36.686L11.7863 40.0706L7.92939 36.2137L11.314 32.829C10.0636 31.0357 9.18372 28.9648 8.78533 26.7273H4V21.2727H8.78533C9.18372 19.0352 10.0636 16.9643 11.314 15.171L7.92939 11.7863L11.7863 7.92939L15.171 11.314C16.9643 10.0636 19.0352 9.18372 21.2727 8.78533V4H26.7273V8.78533C28.9648 9.18372 31.0357 10.0636 32.829 11.314L36.2137 7.92939L40.0706 11.7863L36.686 15.171Z"
                  fill={pathColor_One}
                  stroke={pathColor_Two}
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <path
                  d="M24 29C26.7614 29 29 26.7614 29 24C29 21.2386 26.7614 19 24 19C21.2386 19 19 21.2386 19 24C19 26.7614 21.2386 29 24 29Z"
                  fill={pathColor_Two}
                  stroke="white"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
