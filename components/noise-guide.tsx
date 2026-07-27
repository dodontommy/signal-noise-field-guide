"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import {
  GLOSSARY,
  RELEASES,
  ROUTES,
  TIMELINE,
  VECTOR_META,
  releaseKey,
  type Availability,
  type Depth,
  type Release,
  type VectorId,
} from "../lib/guide-data";

type ListeningState = {
  heard?: boolean;
  queued?: boolean;
  favorite?: boolean;
};

type Tracker = Record<string, ListeningState>;
type SortMode =
  | "CURATED"
  | "YEAR_ASC"
  | "YEAR_DESC"
  | "ARTIST"
  | "INTENSITY";

const STORAGE_KEY = "signal-noise-field-guide-v1";
const VECTOR_IDS = Object.keys(VECTOR_META) as VectorId[];

const availabilityLabel: Record<Availability, string> = {
  apple: "APPLE LISTED",
  "off-platform": "DIG ELSEWHERE",
  unknown: "CHECK SOURCES",
};

const depthOrder: Record<Depth, number> = {
  START: 0,
  CORE: 1,
  DEEP: 2,
  ABYSS: 3,
};

const releaseId = (release: Release) =>
  `release-${releaseKey(release.artist, release.title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;

const query = (value: string) => encodeURIComponent(value);

const sourceLinks = (release: Release) => {
  const terms = `${release.artist} ${release.title}`;
  return [
    {
      label: release.appleUrl ? "OPEN IN APPLE MUSIC" : "SEARCH APPLE MUSIC",
      href:
        release.appleUrl ??
        `https://music.apple.com/us/search?term=${query(terms)}`,
    },
    {
      label: "SEARCH BANDCAMP",
      href: `https://bandcamp.com/search?q=${query(terms)}`,
    },
    {
      label: "SEARCH DISCOGS",
      href: `https://www.discogs.com/search/?q=${query(terms)}&type=release`,
    },
    {
      label: "SEARCH YOUTUBE",
      href: `https://www.youtube.com/results?search_query=${query(terms)}`,
    },
  ];
};

function SignalBars({ intensity }: { intensity: Release["intensity"] }) {
  return (
    <span
      className="signal-bars"
      aria-label={`Intensity ${intensity} out of 5`}
      title={`Intensity ${intensity}/5`}
    >
      {[1, 2, 3, 4, 5].map((bar) => (
        <span className={bar <= intensity ? "is-hot" : ""} key={bar} />
      ))}
    </span>
  );
}

function Stamp({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return <span className={`stamp${active ? " is-active" : ""}`}>{children}</span>;
}

export default function NoiseGuide() {
  const [search, setSearch] = useState("");
  const [vector, setVector] = useState<VectorId | "ALL">("ALL");
  const [availability, setAvailability] = useState<Availability | "ALL">("ALL");
  const [depth, setDepth] = useState<Depth | "ALL">("ALL");
  const [sort, setSort] = useState<SortMode>("CURATED");
  const [routeId, setRouteId] = useState<string | null>(null);
  const [tracker, setTracker] = useState<Tracker>({});
  const [hydrated, setHydrated] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const importRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadSavedState = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) setTracker(JSON.parse(saved) as Tracker);
      } catch {
        // A damaged local cache should not prevent access to the guide.
      } finally {
        setHydrated(true);
      }
    }, 0);

    return () => window.clearTimeout(loadSavedState);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tracker));
  }, [hydrated, tracker]);

  useEffect(() => {
    const handleKeys = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        searchRef.current?.focus();
      }

      if (event.key.toLowerCase() === "r" && !isTyping) {
        event.preventDefault();
        randomize();
      }

      if (event.key === "Escape" && !isTyping) clearFilters();
    };

    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  });

  const activeRoute = ROUTES.find((route) => route.id === routeId) ?? null;

  const filtered = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    const routeKeys = activeRoute ? new Set(activeRoute.releaseKeys) : null;
    const list = RELEASES.filter((release) => {
      const key = releaseKey(release.artist, release.title);
      const haystack = [
        release.artist,
        release.title,
        release.year,
        release.country,
        VECTOR_META[release.vector].label,
        release.note,
        ...release.tags,
      ]
        .join(" ")
        .toLowerCase();

      return (
        (!searchTerm || haystack.includes(searchTerm)) &&
        (vector === "ALL" || release.vector === vector) &&
        (availability === "ALL" || release.availability === availability) &&
        (depth === "ALL" || release.depth === depth) &&
        (!routeKeys || routeKeys.has(key))
      );
    });

    if (sort === "YEAR_ASC") return [...list].sort((a, b) => a.year - b.year);
    if (sort === "YEAR_DESC") return [...list].sort((a, b) => b.year - a.year);
    if (sort === "ARTIST") {
      return [...list].sort((a, b) =>
        `${a.artist} ${a.title}`.localeCompare(`${b.artist} ${b.title}`),
      );
    }
    if (sort === "INTENSITY") {
      return [...list].sort(
        (a, b) =>
          b.intensity - a.intensity ||
          depthOrder[a.depth] - depthOrder[b.depth],
      );
    }
    return list;
  }, [activeRoute, availability, depth, search, sort, vector]);

  const totals = useMemo(() => {
    const values = Object.values(tracker);
    return {
      heard: values.filter((item) => item.heard).length,
      queued: values.filter((item) => item.queued).length,
      favorite: values.filter((item) => item.favorite).length,
    };
  }, [tracker]);

  function toggle(key: string, field: keyof ListeningState) {
    setTracker((current) => ({
      ...current,
      [key]: {
        ...current[key],
        [field]: !current[key]?.[field],
      },
    }));
  }

  function clearFilters() {
    setSearch("");
    setVector("ALL");
    setAvailability("ALL");
    setDepth("ALL");
    setSort("CURATED");
    setRouteId(null);
  }

  function chooseRoute(id: string) {
    setSearch("");
    setVector("ALL");
    setAvailability("ALL");
    setDepth("ALL");
    setSort("CURATED");
    setRouteId(id);
    window.setTimeout(() => {
      document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  function randomize() {
    const pool = filtered.length ? filtered : RELEASES;
    const release = pool[Math.floor(Math.random() * pool.length)];
    const label = `${release.artist} — ${release.title}`;
    setFlash(`RANDOM SIGNAL: ${label}`);
    window.setTimeout(() => {
      document
        .getElementById(releaseId(release))
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
    window.setTimeout(() => setFlash(null), 4200);
  }

  function exportTracker() {
    const payload = {
      exportedAt: new Date().toISOString(),
      version: 1,
      tracker,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "signal-noise-listening-log.json";
    anchor.click();
    URL.revokeObjectURL(url);
    setFlash("LISTENING LOG EXPORTED");
    window.setTimeout(() => setFlash(null), 2600);
  }

  function importTracker(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as {
          tracker?: Tracker;
        };
        if (!parsed.tracker || typeof parsed.tracker !== "object") {
          throw new Error("Invalid listening log");
        }
        setTracker(parsed.tracker);
        setFlash("LISTENING LOG IMPORTED");
      } catch {
        setFlash("IMPORT FAILED — WRONG FILE / HOSTILE DATA");
      }
      window.setTimeout(() => setFlash(null), 3200);
      event.target.value = "";
    };
    reader.readAsText(file);
  }

  function routeProgress(keys: string[]) {
    return keys.filter((key) => tracker[key]?.heard).length;
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#archive">
        SKIP TO ARCHIVE
      </a>

      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Signal Noise home">
          SIGNAL<span>{"//"}</span>NOISE
        </a>
        <nav aria-label="Primary navigation">
          <a href="#routes">ROUTES</a>
          <a href="#field-notes">FIELD NOTES</a>
          <a href="#archive">ARCHIVE</a>
        </nav>
        <div className="topbar-count">{RELEASES.length} ENTRIES / NO EXIT</div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-code" aria-hidden="true">
            REF: SN//AM-1993
          </div>
          <p className="eyebrow">A FIELD GUIDE TO SOUND AFTER MUSIC</p>
          <h1>
            START WITH
            <span>THE SICKNESS.</span>
            FOLLOW THE SIGNAL.
          </h1>
          <p className="hero-intro">
            A hostile, navigable map through death industrial, power
            electronics, Japanoise, noisecore, harsh noise wall and the places
            extreme metal goes when riffs are no longer sufficient.
          </p>
          <div className="hero-actions">
            <a className="brute-button is-primary" href="#routes">
              CHOOSE AN ENTRY WOUND
            </a>
            <button className="brute-button" type="button" onClick={randomize}>
              RANDOM SIGNAL <kbd>R</kbd>
            </button>
          </div>
          <div className="hero-ledger" aria-label="Guide statistics">
            <div>
              <strong>{RELEASES.length}</strong>
              <span>RELEASES</span>
            </div>
            <div>
              <strong>{new Set(RELEASES.map((item) => item.artist)).size}</strong>
              <span>ARTISTS</span>
            </div>
            <div>
              <strong>{VECTOR_IDS.length}</strong>
              <span>VECTORS</span>
            </div>
            <div>
              <strong>
                1977–{Math.max(...RELEASES.map((item) => item.year))}
              </strong>
              <span>TIME RANGE</span>
            </div>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <span>∞</span>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div>
            {
              "DEATH INDUSTRIAL /// POWER ELECTRONICS /// JAPANOISE /// NOISECORE /// HARSH NOISE WALL /// METAL FAILURE /// DEATH INDUSTRIAL /// POWER ELECTRONICS /// JAPANOISE /// NOISECORE /// HARSH NOISE WALL /// METAL FAILURE ///"
            }
          </div>
        </div>

        <section className="routes-section ruled-section" id="routes">
          <div className="section-heading">
            <p className="eyebrow">01 / CONTROLLED EXPOSURE</p>
            <h2>FIVE WAYS IN.</h2>
            <p>
              Each route is an eight-record sequence, ordered as a deliberate
              descent rather than a pile of names somebody copied from a forum
              in 2007.
            </p>
          </div>

          <div className="route-grid">
            {ROUTES.map((route) => (
              <article
                className={`route-card route-${route.color}${
                  routeId === route.id ? " is-selected" : ""
                }`}
                key={route.id}
              >
                <div className="route-number">{route.number}</div>
                <div className="route-copy">
                  <p>{route.subtitle}</p>
                  <h3>{route.title}</h3>
                  <p className="route-description">{route.description}</p>
                </div>
                <ol>
                  {route.releaseKeys.map((key) => {
                    const release = RELEASES.find(
                      (item) => releaseKey(item.artist, item.title) === key,
                    );
                    return release ? (
                      <li key={key}>
                        <span>{release.artist}</span>
                        {release.title}
                      </li>
                    ) : null;
                  })}
                </ol>
                <div className="route-footer">
                  <span>
                    {routeProgress(route.releaseKeys)}/{route.releaseKeys.length}{" "}
                    HEARD
                  </span>
                  <button type="button" onClick={() => chooseRoute(route.id)}>
                    LOAD ROUTE →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="field-section ruled-section" id="field-notes">
          <div className="section-heading">
            <p className="eyebrow">02 / ORIENTATION</p>
            <h2>KNOW THE DAMAGE.</h2>
            <p>
              “Noise” is a family argument, not a single sound. These are the
              useful distinctions before somebody insists every distorted
              record is harsh noise wall.
            </p>
          </div>

          <div className="orientation-grid">
            <div className="vector-index">
              {VECTOR_IDS.map((id, index) => (
                <button
                  className={vector === id ? "is-active" : ""}
                  key={id}
                  type="button"
                  onClick={() => {
                    setVector(id);
                    setRouteId(null);
                    document
                      .getElementById("archive")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{VECTOR_META[id].label}</strong>
                  <small>{VECTOR_META[id].definition}</small>
                </button>
              ))}
            </div>

            <aside className="content-warning">
              <div className="warning-stripe" aria-hidden="true" />
              <p className="eyebrow">CONTENT / CONTEXT</p>
              <h3>CONFRONTATION IS NOT NEUTRAL.</h3>
              <p>
                Power electronics and related industrial scenes frequently use
                real violence, abuse, authoritarian imagery, misogyny, racism
                and traumatic recordings as material. Intent varies. Impact
                does not politely wait for the liner notes.
              </p>
              <p>
                Vet artists and track descriptions when you need to. Skipping a
                record is not a failure of extremity; it is evidence that you
                still have executive function.
              </p>
            </aside>
          </div>

          <div className="timeline">
            {TIMELINE.map(([years, title, description]) => (
              <article key={years}>
                <time>{years}</time>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <details className="glossary">
            <summary>OPEN FIELD GLOSSARY / {GLOSSARY.length} TERMS</summary>
            <div>
              {GLOSSARY.map(([term, definition]) => (
                <article key={term}>
                  <h3>{term}</h3>
                  <p>{definition}</p>
                </article>
              ))}
            </div>
          </details>
        </section>

        <section className="archive-section ruled-section" id="archive">
          <div className="section-heading archive-heading">
            <div>
              <p className="eyebrow">03 / THE FULL INDEX</p>
              <h2>THE ARCHIVE.</h2>
            </div>
            <div className="progress-block">
              <span>
                <b>{totals.heard}</b> HEARD
              </span>
              <span>
                <b>{totals.queued}</b> QUEUED
              </span>
              <span>
                <b>{totals.favorite}</b> MARKED
              </span>
            </div>
          </div>

          <div className="control-desk">
            <label className="search-control">
              <span>SEARCH TRANSMISSION</span>
              <input
                ref={searchRef}
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="ARTIST / RECORD / COUNTRY / TEXTURE"
              />
              <kbd>/</kbd>
            </label>

            <label>
              <span>VECTOR</span>
              <select
                value={vector}
                onChange={(event) => {
                  setVector(event.target.value as VectorId | "ALL");
                  setRouteId(null);
                }}
              >
                <option value="ALL">ALL VECTORS</option>
                {VECTOR_IDS.map((id) => (
                  <option value={id} key={id}>
                    {VECTOR_META[id].label.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>ACCESS</span>
              <select
                value={availability}
                onChange={(event) =>
                  setAvailability(event.target.value as Availability | "ALL")
                }
              >
                <option value="ALL">ANY SOURCE</option>
                <option value="apple">APPLE LISTED</option>
                <option value="off-platform">DIG ELSEWHERE</option>
                <option value="unknown">CHECK SOURCES</option>
              </select>
            </label>

            <label>
              <span>DEPTH</span>
              <select
                value={depth}
                onChange={(event) =>
                  setDepth(event.target.value as Depth | "ALL")
                }
              >
                <option value="ALL">ANY DEPTH</option>
                <option value="START">START HERE</option>
                <option value="CORE">CORE</option>
                <option value="DEEP">DEEP CUT</option>
                <option value="ABYSS">ABYSS</option>
              </select>
            </label>

            <label>
              <span>SORT</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortMode)}
              >
                <option value="CURATED">CURATED ORDER</option>
                <option value="YEAR_ASC">YEAR: ASCENDING</option>
                <option value="YEAR_DESC">YEAR: DESCENDING</option>
                <option value="ARTIST">ARTIST: A–Z</option>
                <option value="INTENSITY">INTENSITY: HIGH–LOW</option>
              </select>
            </label>

            <button
              className="clear-control"
              type="button"
              onClick={clearFilters}
            >
              RESET / ESC
            </button>
          </div>

          <div className="active-filter-line">
            <span>
              DISPLAYING <b>{filtered.length}</b> / {RELEASES.length} RELEASES
            </span>
            {activeRoute ? (
              <Stamp active>ROUTE: {activeRoute.title}</Stamp>
            ) : (
              <Stamp>UNRESTRICTED SIGNAL</Stamp>
            )}
            {vector !== "ALL" && (
              <Stamp active>{VECTOR_META[vector].short}</Stamp>
            )}
            {availability !== "ALL" && (
              <Stamp active>{availabilityLabel[availability]}</Stamp>
            )}
            {depth !== "ALL" && <Stamp active>{depth}</Stamp>}
          </div>

          <div className="release-list">
            {filtered.map((release, index) => {
              const key = releaseKey(release.artist, release.title);
              const state = tracker[key] ?? {};
              return (
                <article
                  className={`release-card${state.heard ? " is-heard" : ""}${
                    state.favorite ? " is-favorite" : ""
                  }`}
                  id={releaseId(release)}
                  key={key}
                >
                  <div className="release-index">
                    {String(index + 1).padStart(3, "0")}
                  </div>
                  <div className="release-core">
                    <div className="release-kicker">
                      <span>{VECTOR_META[release.vector].short}</span>
                      <span>{release.country}</span>
                      <span>{release.year}</span>
                    </div>
                    <h3>
                      <span>{release.artist}</span>
                      <em>{release.title}</em>
                    </h3>
                    <p>{release.note}</p>
                    <div className="release-tags">
                      <Stamp active={release.depth === "START"}>
                        {release.depth}
                      </Stamp>
                      <Stamp>{availabilityLabel[release.availability]}</Stamp>
                      {release.tags.map((tag) => (
                        <Stamp key={tag}>{tag}</Stamp>
                      ))}
                    </div>
                  </div>

                  <div className="release-meter">
                    <span>PRESSURE</span>
                    <SignalBars intensity={release.intensity} />
                  </div>

                  <details className="release-sources">
                    <summary>LOCATE / INFO</summary>
                    <div>
                      {sourceLinks(release).map((link) => (
                        <a
                          href={link.href}
                          key={link.label}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  </details>

                  <div className="tracker-controls">
                    <button
                      className={state.queued ? "is-active" : ""}
                      type="button"
                      onClick={() => toggle(key, "queued")}
                      aria-pressed={Boolean(state.queued)}
                    >
                      + QUEUE
                    </button>
                    <button
                      className={state.heard ? "is-active" : ""}
                      type="button"
                      onClick={() => toggle(key, "heard")}
                      aria-pressed={Boolean(state.heard)}
                    >
                      {state.heard ? "✓ HEARD" : "○ HEARD"}
                    </button>
                    <button
                      className={state.favorite ? "is-active" : ""}
                      type="button"
                      onClick={() => toggle(key, "favorite")}
                      aria-pressed={Boolean(state.favorite)}
                    >
                      {state.favorite ? "✕ MARKED" : "× MARK"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {!filtered.length && (
            <div className="no-results">
              <strong>NO SIGNAL.</strong>
              <p>
                The archive survived. Your filters did not. Reset them and try
                a less exquisitely specific wound.
              </p>
              <button
                className="brute-button is-primary"
                onClick={clearFilters}
              >
                RESET FILTERS
              </button>
            </div>
          )}

          <div className="data-tools">
            <div>
              <p className="eyebrow">LOCAL LISTENING LOG</p>
              <h3>YOUR DAMAGE STAYS ON YOUR DEVICE.</h3>
              <p>
                Heard, queue and marked states live in local storage. Export a
                backup before clearing browser data or moving machines.
              </p>
            </div>
            <div>
              <button className="brute-button" onClick={exportTracker}>
                EXPORT JSON
              </button>
              <button
                className="brute-button"
                onClick={() => importRef.current?.click()}
              >
                IMPORT JSON
              </button>
              <input
                ref={importRef}
                className="visually-hidden"
                type="file"
                accept="application/json,.json"
                onChange={importTracker}
              />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-mark">SIGNAL//NOISE</div>
        <p>
          A SUBJECTIVE FIELD GUIDE. DATES REFER TO ORIGINAL RELEASES; STREAMING
          AVAILABILITY MUTATES WITHOUT WARNING.
        </p>
        <a href="#top">RETURN TO INPUT ↑</a>
      </footer>

      {flash && (
        <div className="flash-message" role="status">
          {flash}
        </div>
      )}
    </div>
  );
}
