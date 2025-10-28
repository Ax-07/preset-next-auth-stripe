"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, Laptop2Icon } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes = ["light", "dark", "system"] as const;
  const currentIndex = themes.indexOf((theme as typeof themes[number]) || "system");

  const handleThemeClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setTheme(themes[index]);
  };

  const icons = [
    { icon: <SunIcon key="sun" className="h-4 w-4" />, theme: "light" },
    { icon: <MoonIcon key="moon" className="h-4 w-4" />, theme: "dark" },
    { icon: <Laptop2Icon key="sys" className="h-4 w-4" />, theme: "system" }
  ];

  return (
    <div className="relative flex items-center bg-muted rounded-full w-20 h-8 px-1 select-none outline">
      <motion.div
        className="absolute top-1 left-1 w-6 h-6 bg-background rounded-full shadow-md"
        animate={{ x: currentIndex * 24 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <div className="flex justify-between w-full text-muted-foreground px-1">
        {icons.map((item, i) => (
          <div
            key={i}
            onClick={(e) => handleThemeClick(i, e)}
            className={`cursor-pointer hover:scale-110 transition-transform z-10 ${
              i === currentIndex ? "text-primary" : "opacity-50 hover:opacity-75"
            }`}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
}
