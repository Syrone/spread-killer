import { useLayoutEffect, useState } from "react"

const THEME_KEY = "theme"

export function useTheme() {
  const getInitial = () => {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === 'dark' ? 'dark' : 'light';
  }

  const [theme, setTheme] = useState(getInitial)

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark-theme', theme === 'dark');
    root.classList.toggle('light-theme', theme === 'light');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  return { theme, toggleTheme }
}
