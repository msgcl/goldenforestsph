import { useEffect } from "react";
import { useLocation } from "wouter";

export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Ensure route transitions always start from top.
    const scrollTarget = document.getElementById("app-scroll-container");
    if (scrollTarget) {
      scrollTarget.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}