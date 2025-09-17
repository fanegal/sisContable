import { useLocation, useRoutes } from "react-router-dom";
import { appRoutes } from "./routes/routes";
import { useEffect } from "react";

export default function App() {

  const location = useLocation();

  useEffect(() => {
    try {
      const parts = location.pathname.split("/").filter(Boolean);
      let url = parts.pop() ?? "";
      url = url ? url.charAt(0).toUpperCase() + url.slice(1) : "";

      let el: any = document.querySelector(".search-input") as HTMLInputElement | null;
      if (el) {
        const p = document.createElement("p");
        p.className = "title-paragraph";
        p.textContent = url;
        el.replaceWith(p);
      } else {
        el = document.querySelector(".title-paragraph") as HTMLInputElement | null;
        const p2 = document.createElement("p");
        p2.className = "title-paragraph";
        p2.textContent = url;
        el.replaceWith(p2);
      }
    } catch (error) {

<<<<<<< HEAD
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
=======
>>>>>>> 85287bf2b47ac23b785633b938c52dcc278b855b
    }
  }, [location.pathname]);

  const routing = useRoutes(appRoutes);
  return routing;
}
