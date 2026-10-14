import { lazy } from "react";

// Every folder in src/apps with an App.jsx and a meta.js becomes an app.
// Adding an app = adding a folder; nothing else to register.
const metas = import.meta.glob("./apps/*/meta.js", { eager: true, import: "default" });
const loaders = import.meta.glob("./apps/*/App.jsx");

export const apps = Object.entries(metas)
  .map(([path, meta]) => {
    const slug = path.split("/")[2];
    const loader = loaders[`./apps/${slug}/App.jsx`];
    return loader ? { slug, ...meta, Component: lazy(loader) } : null;
  })
  .filter(Boolean)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.title.localeCompare(b.title));

export const groups = apps.reduce((acc, app) => {
  const name = app.group || "Other";
  (acc[name] ||= []).push(app);
  return acc;
}, {});
