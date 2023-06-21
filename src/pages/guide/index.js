import Or from "@/components/Or";
import React from "react";

export default function Index() {
  return (
    <>
      <main>
        <h1>Guide</h1>
        <p>You have to allow Insecure Content to check the http links.</p>
        <header>
          <Or>
            <h2>Chromium</h2>
          </Or>
        </header>
        <video controls src="/assets/video/chrome.mp4"></video>
        <header>
          <Or>
            <h2>Firefox</h2>
          </Or>
        </header>
        <video controls src="/assets/video/firefox.mp4"></video>
      </main>
      <style jsx>{`
        main {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        header {
          margin: 1rem;
          margin-inline: 2rem;
          width: 100%;
        }

        video {
          width: 50%;
        }
      `}</style>
    </>
  );
}
