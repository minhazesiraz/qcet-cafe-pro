"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ display: "flex", gap: "10px", padding: "20px" }}>
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
      {/* <button onClick={() => setTheme("orange")}>Orange Mode</button> */}
      <button onClick={() => setTheme("system")}>System Default</button>

      <div>Current theme: {theme}</div>
    </div>
  );
}
