import { useEffect } from "react";
import { useLocation } from "wouter";

export function scrollPageToTop() {
  document.getElementById("app-scroll-container")?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Ensure route transitions always start from top.
    scrollPageToTop();
  }, [location]);

  return null;
}
