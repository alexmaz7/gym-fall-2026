import { Link } from "react-router-dom";
import { groups } from "./registry.js";

export default function Launcher() {
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

  return (
    <main className="hub">
      <header className="hub-head">
        <h1>Apps</h1>
        <p>{today}</p>
      </header>

      {Object.entries(groups).map(([group, list]) => (
        <section key={group} className="hub-group" aria-labelledby={`g-${group}`}>
          <h2 id={`g-${group}`}>{group}</h2>
          <ul>
            {list.map((app) => (
              <li key={app.slug}>
                <Link to={`/apps/${app.slug}`} className="hub-row" style={{ "--spine": app.accent }}>
                  <span className="hub-title">{app.title}</span>
                  <span className="hub-desc">{app.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {Object.keys(groups).length === 0 && (
        <p className="hub-none">No apps yet. Add a folder to src/apps with an App.jsx and a meta.js.</p>
      )}
    </main>
  );
}
