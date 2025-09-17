import { useLocation, useRoutes } from "react-router-dom";
import { appRoutes } from "./routes/routes";
import { useEffect } from "react";

export default function App() {

  const location = useLocation();

  useEffect(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    let url = parts.pop() ?? "";
    url = url ? url.charAt(0).toUpperCase() + url.slice(1) : "";

    const p = document.createElement("p");
    p.className = "title-paragraph";
    p.textContent = url;

    let el: any = document.querySelector(".search-input") as HTMLInputElement | null;
    if (el) { 
      el.replaceWith(p);
    } else {
      el = document.querySelector(".title-paragraph") as HTMLInputElement | null;
      if(el){
      el.replaceWith(p);
      }
    }
  }, [location.pathname]);

  const routing = useRoutes(appRoutes);
  return routing;
}
