import { Suspense, useEffect, useState } from "react";

// Hide the home button while scrolling down, bring it back on scroll up or at the top/bottom.
function useShowOnScrollUp() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const atEdge = y < 40 || window.innerHeight + y >= document.documentElement.scrollHeight - 40;
      if (atEdge || y < last - 4) setShow(true);
      else if (y > last + 4) setShow(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return show;
}
import { Link, Route, Routes, useParams } from "react-router-dom";
import { apps } from "./registry.js";
import Launcher from "./Launcher.jsx";

function AppScreen() {
  const { slug } = useParams();
  const app = apps.find((a) => a.slug === slug);
  const showHome = useShowOnScrollUp();

  if (!app) {
    return (
      <main className="hub-empty">
        <p>There's no app at this address.</p>
        <Link to="/">Back to all apps</Link>
      </main>
    );
  }

  const { Component } = app;
  return (
    <>
      <Suspense fallback={<div className="hub-loading" aria-live="polite">Opening {app.title}…</div>}>
        <Component />
      </Suspense>
      <Link to="/" className={showHome ? "hub-home" : "hub-home is-hidden"} aria-label="All apps">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <rect x="3" y="3" width="7" height="7" rx="2" />
          <rect x="14" y="3" width="7" height="7" rx="2" />
          <rect x="3" y="14" width="7" height="7" rx="2" />
          <rect x="14" y="14" width="7" height="7" rx="2" />
        </svg>
      </Link>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Launcher />} />
      <Route path="/apps/:slug" element={<AppScreen />} />
      <Route path="*" element={<Launcher />} />
    </Routes>
  );
}
