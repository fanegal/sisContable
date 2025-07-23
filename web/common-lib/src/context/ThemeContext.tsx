import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ThemeName = string;

interface ThemeObject {
  color: string;
  background: string;
  componentColor: string;
  component: string;
  // puedes agregar más props como background, font, etc.
}

interface ThemeContextProps {
  theme: any;
  toggleTheme: () => void;
  setTheme: (themeName: ThemeName) => void;
  availableThemes: ThemeName[];
}

interface ThemeProviderProps {
  children: ReactNode;
  themes: Record<ThemeName, any>; // Ej: { light: {...}, dark: {...} }
  defaultTheme?: ThemeName;
}

const LOCAL_STORAGE_KEY = "active-theme";

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({
  children,
  themes,
  defaultTheme = Object.keys(themes)[0],
}: ThemeProviderProps) => {
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved && themes[saved] ? saved : defaultTheme;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem(LOCAL_STORAGE_KEY, themeName);
  }, [themeName]);

  const toggleTheme = () => {
    const keys = Object.keys(themes);
    const index = keys.indexOf(themeName);
    const next = keys[(index + 1) % keys.length];
    setThemeName(next);
  };

  const setTheme = (newThemeName: ThemeName) => {
    if (themes[newThemeName]) {
      setThemeName(newThemeName);
    } else {
      console.warn(`El theme "${newThemeName}" no está en la lista de disponibles`);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: themes[themeName],
        toggleTheme,
        setTheme,
        availableThemes: Object.keys(themes),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.warn("useTheme se usó fuera de ThemeProvider. Usando tema por defecto.");
    return {
      theme: {
        color: "#ccc",
        background: "#fff",
        componentColor: "#000",
        component: "#f0f0f0",
        textColor: "#000", // si usas esto también
        primary: "#007bff", // opcional
      },
      toggleTheme: () => {},
      setTheme: () => {},
      availableThemes: [],
    };
  }
  return context;
};