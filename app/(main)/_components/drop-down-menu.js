"use client";

import { useEffect, useRef, useState } from "react";
import { LuGitBranch, LuLayoutDashboard, LuSettings } from "react-icons/lu";

export default function DropdownIcon(props) {
   const [isOpen, setIsOpen] = useState(false);
   const [currentItem, setCurrentItem] = useState(0);
   const wrapperRef = useRef(null);

   const navigationItems = [
      {
         linkName: "Dashboard",
         icon: LuLayoutDashboard,
         sortDescription: "Quick overview of all basic metrics and settings"
      },
      {
         linkName: "Metrics and analytics",
         icon: LuLayoutDashboard,
         sortDescription: "Detailed analytic data reviews management"
      },
      { separator: true },
      {
         linkName: "Multi-Channel Funnels overview",
         icon: LuGitBranch,
         sortDescription:
            "Generated from conversion paths, the sequences of interactions"
      },
      {
         linkName: "User settings",
         icon: LuSettings,
         sortDescription:
            "User settings allow you to configure your email preferences"
      },
      {
         linkName: "User Profile",
         icon: LuLayoutDashboard,
         sortDescription:
            "A collection of settings and information about your account"
      }
   ];

   useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      };
   });

   useEffect(() => {
      function handleClickOutside(event) {
         if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsOpen(false);
         }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const handleKeyDown = (e) => {
      if (isOpen) {
         e.preventDefault();
         switch (e.keyCode) {
            case 40: // down
               if (currentItem === navigationItems.length - 1) {
                  setCurrentItem(0);
               } else {
                  if (navigationItems[currentItem + 1]?.separator) {
                     setCurrentItem(currentItem + 2);
                  } else {
                     setCurrentItem(currentItem + 1);
                  }
               }
               break;
            case 38: // up
               if (currentItem === 0) {
                  setCurrentItem(navigationItems.length - 1);
               } else {
                  if (navigationItems[currentItem - 1]?.separator) {
                     setCurrentItem(currentItem - 2);
                  } else {
                     setCurrentItem(currentItem - 1);
                  }
               }
               break;
            case 27: // esc
               setCurrentItem(1);
               setIsOpen(false);
               break;
            default:
               break;
         }
      }
   };

   return (
      <div className="relative inline-flex">
         <button
            className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen ? "true" : "false"}
            ref={wrapperRef}
         >
            {/* <span>Choose one</span>
            <span className="relative only:-mx-5">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
               </svg>
            </span> */}
            <a
               href="#"
               className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white"
            >
               <img
                  src="https://i.pravatar.cc/40?img=35"
                  alt="user name"
                  title="user name"
                  width="40"
                  height="40"
                  className="max-w-full rounded-full"
               />
               <span className="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 p-1 text-sm text-white">
                  <span className="sr-only"> 7 new emails </span>
               </span>
            </a>
         </button>

         <ul
            className={`${
               isOpen ? "flex" : "hidden"
            } absolute top-full z-10 mt-1 w-72 list-none flex-col rounded bg-white py-2 shadow-md shadow-slate-500/10`}
         >
            {navigationItems.map((item, index) => {
               if (item.separator) {
                  return (
                     <li
                        key={index}
                        role="separator"
                        className="border-b border-slate-200"
                     ></li>
                  );
               }

               const Icon = item.icon;

               return (
                  <li key={index}>
                     <a
                        className={`${
                           index === currentItem
                              ? "bg-emerald-50 text-emerald-500"
                              : "bg-none text-slate-500"
                        } flex items-start gap-2 p-2 px-5 transition-colors duration-300 hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 focus:text-emerald-600`}
                        href="#"
                        aria-current={index === currentItem ? "page" : "false"}
                     >
                        <Icon className="w-5 h-5 mt-1 flex-shrink-0" />
                        <span className="flex flex-col gap-1 overflow-hidden whitespace-nowrap">
                           <span className="leading-5 truncate">
                              {item.linkName}
                           </span>
                           <span className="text-sm whitespace-normal opacity-70">
                              {item.sortDescription}
                           </span>
                        </span>
                     </a>
                  </li>
               );
            })}
         </ul>
      </div>
   );
}
