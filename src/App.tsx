import { clsx } from "clsx"
import "./App.css"
import Checklist from "./features/CheckList/Checklist"
import { createContext, useState } from "react"
import ReactSwitch from "react-switch"

type State = {
  toggleTheme: () => void
  theme: "light" | "dark" | string
} | null

export const ThemeContext = createContext<State>(null)

const App = () => {
  const [theme, setTheme] = useState("dark")

  const toggleTheme = () => {
    setTheme(curr => (curr === "light" ? "dark" : "light"))
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={clsx(
          "bg-dark d-flex vh-100 vw-100  align-items-center justify-content-center pt-4",
          theme === "light" && "bg-white",
        )}
      >
        <p
          className={clsx(
            theme === "light" && "text-dark",
            theme === "dark" && "text-light",
            "px-3",
            "pt-2",
            "fs-5 text",
          )}
        >
          Light / Dark Mode:
        </p>
        <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        <Checklist />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
