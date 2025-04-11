"use client";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading skeleton if you want
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      <h1
        className={`${
          currentTheme === "dark" ? "text-red-600" : "text-green-500"
        }`}
      >
        Home Page
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, quo.
      </p>
      <ThemeSwitcher />
    </>
  );
}
