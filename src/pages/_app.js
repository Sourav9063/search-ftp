import React, { useEffect } from "react";
import "../styles/globals.css";
import MainDataProvider from "../provider/mainDataProvider";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js", { scope: "/" })
          .then((registration) => {
            console.log(
              "Service Worker registered with scope:",
              registration.scope
            );
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error);
          });
      });
    }
  }, []);
  return (
    <MainDataProvider>
      <Component {...pageProps} />
    </MainDataProvider>
  );
}
