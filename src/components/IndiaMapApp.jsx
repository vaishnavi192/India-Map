import { useEffect, useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import topo from "@/data/india-states.json";
import "./IndiaMapApp.css";

/* ============================================================
   DATA — states + per-state attractions/heat/economy
   Add more states by extending STATE_DATA below.
============================================================ */
const PALETTE = [
  "351 83% 61%", "28 95% 60%",  "45 95% 55%",  "142 65% 48%", "173 70% 45%",
  "199 85% 55%", "230 75% 62%", "270 70% 62%", "320 70% 60%", "12 75% 55%",
];
const colorFor = (name) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return `hsl(${PALETTE[h % PALETTE.length]})`;
};

const CATEGORY_META = {
  historical: { label: "Historical", color: "28 95% 60%" },
  natural:    { label: "Natural",    color: "142 65% 48%" },
  cultural:   { label: "Cultural",   color: "270 70% 62%" },
};

const STATE_DATA = {
  Maharashtra: {
    avgTemp: 33, baseColor: "351 83% 61%",
    attractions: [
      { name: "Gateway of India", category: "historical", coords: [72.8347, 18.922], detail: "Iconic Mumbai monument" },
      { name: "Ajanta Caves", category: "cultural", coords: [75.7, 20.55], detail: "UNESCO rock-cut Buddhist art" },
      { name: "Ellora Caves", category: "historical", coords: [75.18, 20.02], detail: "1500-year-old temple complex" },
      { name: "Lonavala Hills", category: "natural", coords: [73.405, 18.754], detail: "Misty Sahyadri retreat" },
      { name: "Tadoba Reserve", category: "natural", coords: [79.36, 20.21], detail: "Tigers in deep jungle" },
      { name: "Shaniwar Wada", category: "historical", coords: [73.855, 18.519], detail: "Peshwa-era fort, Pune" },
    ],
    heat: [[72.83,18.92,32],[73.85,18.52,31],[75.7,20.55,36],[79.36,20.21,38],[77,19,35],[74.5,17.5,30]],
    economy: [[72.83,18.92,1],[73.85,18.52,.85],[73.78,19.99,.55],[75.34,19.88,.45],[79.08,21.15,.6],[77,19,.3],[74.5,17.5,.35],[76,20.5,.25]],
  },
  "Uttar Pradesh": {
    avgTemp: 41, baseColor: "28 95% 60%",
    attractions: [
      { name: "Taj Mahal", category: "historical", coords: [78.0421, 27.1751], detail: "Mughal marble masterpiece" },
      { name: "Varanasi Ghats", category: "cultural", coords: [83, 25.32], detail: "Sacred Ganges river front" },
      { name: "Bara Imambara", category: "historical", coords: [80.91, 26.87], detail: "Lucknow's labyrinth" },
      { name: "Dudhwa NP", category: "natural", coords: [80.6, 28.5], detail: "Tigers & swamp deer" },
      { name: "Fatehpur Sikri", category: "historical", coords: [77.66, 27.09], detail: "Akbar's red sandstone city" },
      { name: "Ayodhya", category: "cultural", coords: [82.2, 26.79], detail: "Ancient pilgrimage city" },
    ],
    heat: [[78.04,27.17,42],[80.91,26.87,40],[83,25.32,41],[80.6,28.5,35],[82.2,26.79,39],[79.5,28,36]],
    economy: [[80.91,26.87,.95],[78.04,27.17,.85],[82.97,25.32,.7],[81.85,25.45,.6],[77.5,28.5,.65],[83.36,26.76,.4],[80,27.5,.3]],
  },
  Karnataka: {
    avgTemp: 34, baseColor: "230 75% 62%",
    attractions: [
      { name: "Hampi Ruins", category: "historical", coords: [76.475, 15.335], detail: "Vijayanagara empire ruins" },
      { name: "Mysore Palace", category: "historical", coords: [76.654, 12.305], detail: "Royal Wodeyar residence" },
      { name: "Coorg Hills", category: "natural", coords: [75.74, 12.42], detail: "Coffee country mist" },
      { name: "Bangalore Palace", category: "cultural", coords: [77.59, 12.998], detail: "Tudor-style royal home" },
      { name: "Gokarna Beach", category: "natural", coords: [74.32, 14.55], detail: "Pristine Konkan coast" },
      { name: "Jog Falls", category: "natural", coords: [74.81, 14.23], detail: "Plunging cascade" },
    ],
    heat: [[77.59,12.99,30],[76.65,12.3,32],[74.32,14.55,33],[76.47,15.33,38],[75.74,12.42,26],[74.81,14.23,28]],
    economy: [[77.59,12.99,1],[76.65,12.3,.7],[74.85,12.87,.55],[75,15.35,.4],[77.1,14.45,.3],[76,13.5,.45]],
  },
  "Tamil Nadu": {
    avgTemp: 35, baseColor: "12 75% 55%",
    attractions: [
      { name: "Marina Beach", category: "natural", coords: [80.282, 13.05], detail: "World's longest urban beach" },
      { name: "Meenakshi Temple", category: "cultural", coords: [78.119, 9.919], detail: "Towering Madurai gopurams" },
      { name: "Mahabalipuram", category: "historical", coords: [80.19, 12.616], detail: "Pallava shore temples" },
      { name: "Ooty Hills", category: "natural", coords: [76.69, 11.41], detail: "Nilgiri tea slopes" },
      { name: "Thanjavur Temple", category: "historical", coords: [79.13, 10.78], detail: "Chola Brihadeeswarar" },
      { name: "Rameswaram", category: "cultural", coords: [79.31, 9.288], detail: "Sacred island shrine" },
    ],
    heat: [[80.28,13.05,36],[78.12,9.92,38],[80.19,12.62,35],[76.69,11.41,22],[79.13,10.78,36],[79.31,9.29,34]],
    economy: [[80.28,13.05,1],[77,11,.7],[78.12,9.92,.55],[79.13,10.78,.45],[76.96,11,.6],[78.7,10.8,.3]],
  },
  Kerala: {
    avgTemp: 31, baseColor: "142 65% 48%",
    attractions: [
      { name: "Alleppey Backwaters", category: "natural", coords: [76.34, 9.49], detail: "Houseboat lagoons" },
      { name: "Munnar Tea Hills", category: "natural", coords: [77.06, 10.09], detail: "Emerald plantations" },
      { name: "Fort Kochi", category: "historical", coords: [76.24, 9.97], detail: "Colonial harbor heritage" },
      { name: "Periyar Wildlife", category: "natural", coords: [77.16, 9.46], detail: "Elephants by the lake" },
      { name: "Padmanabhaswamy", category: "cultural", coords: [76.94, 8.48], detail: "Golden Vishnu temple" },
      { name: "Bekal Fort", category: "historical", coords: [75.03, 12.39], detail: "Seaside basalt fortress" },
    ],
    heat: [[76.34,9.49,31],[77.06,10.09,22],[76.24,9.97,30],[77.16,9.46,26],[76.94,8.48,32],[75.03,12.39,30]],
    economy: [[76.94,8.48,.85],[76.24,9.97,1],[76.34,9.49,.6],[75.78,11.25,.5],[77.06,10.09,.4],[75.03,12.39,.3]],
  },
  Gujarat: {
    avgTemp: 36, baseColor: "45 95% 55%",
    attractions: [
      { name: "Statue of Unity", category: "historical", coords: [73.72, 21.83], detail: "World's tallest statue" },
      { name: "Rann of Kutch", category: "natural", coords: [70.18, 23.85], detail: "Endless white salt desert" },
      { name: "Gir National Park", category: "natural", coords: [70.97, 21.13], detail: "Asiatic lions roam" },
      { name: "Sabarmati Ashram", category: "cultural", coords: [72.58, 23.06], detail: "Gandhi's home" },
      { name: "Dwarka Temple", category: "cultural", coords: [68.97, 22.24], detail: "Krishna's coastal city" },
      { name: "Somnath Temple", category: "historical", coords: [70.4, 20.89], detail: "Eternal shore shrine" },
    ],
    heat: [[72.58,23.06,38],[70.18,23.85,40],[70.97,21.13,35],[73.72,21.83,36],[68.97,22.24,33],[70.4,20.89,32]],
    economy: [[72.58,23.06,1],[72.83,21.17,.9],[70.8,22.3,.55],[73.72,21.83,.6],[70.05,22.47,.4],[69.6,22.47,.3]],
  },
};

const ACTIVE_STATES = Object.keys(STATE_DATA);

/* ============================================================
   MAIN COMPONENT
============================================================ */
const WIDTH = 800;
const HEIGHT = 600;

export default function IndiaMapApp() {
  const [selected, setSelected] = useState(null);
  return (
    <main className="im-page">
      <header className="im-header">
        <h1>Interactive India Map</h1>
        <p>Click a highlighted state to explore.</p>
      </header>

      <div className="im-mapwrap">
        <IndiaMap selected={selected} onSelect={setSelected} />
      </div>

      {selected && (
        <div className="im-modal" onClick={() => setSelected(null)}>
          <div className="im-modal-card" onClick={(e) => e.stopPropagation()}>
            <StateDetail stateName={selected} onClose={() => setSelected(null)} />
          </div>
        </div>
      )}
    </main>
  );
}

/* ============================================================
   INDIA MAP (overview)
============================================================ */
function IndiaMap({ selected, onSelect }) {
  const [hovered, setHovered] = useState(null);
  const colors = useMemo(() => {
    const m = {};
    ACTIVE_STATES.forEach((n) => (m[n] = colorFor(n)));
    return m;
  }, []);

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ scale: 1000, center: [82, 23] }}
      width={800}
      height={800}
      style={{ width: "100%", height: "auto" }}
    >
      <defs>
        <filter id="emboss" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="3" specularConstant="1.1" specularExponent="22" lightingColor="#fff" result="spec">
            <feDistantLight azimuth="135" elevation="55" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="sc" />
          <feComposite in="SourceGraphic" in2="sc" operator="arithmetic" k1="0" k2="1" k3="0.85" k4="0" result="lit" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="sb" />
          <feOffset in="sb" dx="0" dy="1.5" result="so" />
          <feComponentTransfer in="so" result="shadow"><feFuncA type="linear" slope="0.45" /></feComponentTransfer>
          <feMerge><feMergeNode in="shadow" /><feMergeNode in="lit" /></feMerge>
        </filter>
        <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
        <filter id="glass" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="b" />
          <feSpecularLighting in="b" surfaceScale="4" specularConstant="1.4" specularExponent="30" lightingColor="#fff" result="s">
            <feDistantLight azimuth="135" elevation="60" />
          </feSpecularLighting>
          <feComposite in="s" in2="SourceAlpha" operator="in" result="sc" />
          <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="sc" /></feMerge>
        </filter>
      </defs>

      <Geographies geography={topo}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const name = geo.properties.st_nm;
            const isActive = ACTIVE_STATES.includes(name);
            const isSelected = selected === name;
            const isHovered = hovered === name;
            const baseColor = isActive ? colors[name] : "#dbe2ec";
            let fill = baseColor;
            if (isHovered && !isSelected) fill = "#ffe16a";
            if (isSelected) fill = "rgba(255,255,255,0.35)";
            const filter = isSelected ? "url(#glass)" : isActive ? "url(#emboss)" : undefined;

            return (
              <g key={geo.rsmKey}>
                <Geography
                  geography={geo}
                  onMouseEnter={() => setHovered(name)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => isActive && onSelect(name)}
                  style={{
                    default: { fill, stroke: isSelected ? "rgba(255,255,255,0.9)" : "#fff", strokeWidth: isSelected ? 1.2 : 0.6, outline: "none", transition: "fill .25s ease, stroke .25s ease", cursor: isActive ? "pointer" : "default", filter },
                    hover:   { fill: isSelected ? fill : (isActive ? "#ffe16a" : baseColor), stroke: "rgba(255,255,255,0.95)", strokeWidth: 1, outline: "none", cursor: isActive ? "pointer" : "default", filter },
                    pressed: { fill, outline: "none", filter },
                  }}
                />
                {isActive && !isSelected && (
                  <Geography
                    geography={geo}
                    style={{
                      default: { fill: "url(#gloss)", stroke: "none", outline: "none", pointerEvents: "none", mixBlendMode: "overlay" },
                      hover:   { fill: "url(#gloss)", stroke: "none", outline: "none", pointerEvents: "none", mixBlendMode: "overlay" },
                      pressed: { fill: "url(#gloss)", stroke: "none", outline: "none", pointerEvents: "none" },
                    }}
                  />
                )}
              </g>
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}

/* ============================================================
   STATE DETAIL (popup) — pins, heatmap, economy + 3 FABs
============================================================ */
function StateDetail({ stateName, onClose }) {
  const data = STATE_DATA[stateName];
  const [layers, setLayers] = useState({ attractions: true, temperature: false, economy: false });
  const [filters, setFilters] = useState({ historical: true, natural: true, cultural: true });
  const [activePin, setActivePin] = useState(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [stateName, layers.attractions, filters.historical, filters.natural, filters.cultural]);

  const stateGeo = useMemo(() => {
    const fc = feature(topo, topo.objects[Object.keys(topo.objects)[0]]);
    return fc.features.find((f) => f.properties.st_nm === stateName);
  }, [stateName]);

  const { projection, pathD } = useMemo(() => {
    const proj = geoMercator();
    if (stateGeo) proj.fitExtent([[40, 40], [WIDTH - 40, HEIGHT - 40]], stateGeo);
    const path = geoPath(proj);
    return { projection: proj, pathD: stateGeo ? path(stateGeo) ?? "" : "" };
  }, [stateGeo]);

  const project = (lng, lat) => projection([lng, lat]) ?? [0, 0];

  if (!data) {
    return (
      <div className="im-empty">
        <p>No detailed map available for {stateName} yet.</p>
        <button className="im-btn" onClick={onClose}>Back</button>
      </div>
    );
  }

  const visible = data.attractions.filter((a) => filters[a.category]);
  const baseHsl = `hsl(${data.baseColor})`;
  const toggleLayer = (l) => setLayers((p) => ({ ...p, [l]: !p[l] }));

  return (
    <div className="im-detail">
      <div className="im-detail-header">
        <div>
          <h2>{stateName}</h2>
          <p>{visible.length} attractions · avg {data.avgTemp}°C</p>
        </div>
        <button className="im-iconbtn" onClick={onClose} aria-label="Close">✕</button>
      </div>

      <div className="im-detail-map">
        <ComposableMap width={WIDTH} height={HEIGHT} projection={projection} style={{ width: "100%", height: "100%" }}>
          <defs>
            <filter id="sd-emboss" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="blur" />
              <feSpecularLighting in="blur" surfaceScale="3" specularConstant="1.1" specularExponent="22" lightingColor="#fff" result="spec">
                <feDistantLight azimuth="135" elevation="55" />
              </feSpecularLighting>
              <feComposite in="spec" in2="SourceAlpha" operator="in" result="sc" />
              <feComposite in="SourceGraphic" in2="sc" operator="arithmetic" k1="0" k2="1" k3="0.85" k4="0" result="lit" />
              <feMerge><feMergeNode in="lit" /></feMerge>
            </filter>
            <linearGradient id="sd-gloss" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
              <stop offset="45%" stopColor="#fff" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.18" />
            </linearGradient>
            <radialGradient id="pin-glow">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#fff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>

          <clipPath id="sd-clip"><path d={pathD} /></clipPath>

          {stateGeo && (
            <g>
              <path d={pathD} fill={baseHsl} stroke="#fff" strokeWidth={1.2} filter="url(#sd-emboss)" />
              <path d={pathD} fill="url(#sd-gloss)" pointerEvents="none" style={{ mixBlendMode: "overlay" }} />
            </g>
          )}

          {layers.economy && (
            <g clipPath="url(#sd-clip)">
              {data.economy.map(([lng, lat, w], i) => {
                const [x, y] = project(lng, lat);
                const r = 90 + w * 90;
                const id = `econ-${i}`;
                const alpha = 0.15 + w * 0.7;
                return (
                  <g key={`e-${i}`}>
                    <defs>
                      <radialGradient id={id}>
                        <stop offset="0%" stopColor={`hsla(${data.baseColor}, ${alpha})`} />
                        <stop offset="100%" stopColor={`hsla(${data.baseColor}, 0)`} />
                      </radialGradient>
                    </defs>
                    <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
                  </g>
                );
              })}
            </g>
          )}

          {layers.temperature && (
            <g clipPath="url(#sd-clip)">
              {data.heat.map(([lng, lat, t], i) => {
                const [x, y] = project(lng, lat);
                const norm = Math.max(0, Math.min(1, (t - 20) / 25));
                const hue = 220 - norm * 220;
                const id = `heat-${i}`;
                return (
                  <g key={`h-${i}`}>
                    <defs>
                      <radialGradient id={id}>
                        <stop offset="0%" stopColor={`hsla(${hue}, 90%, 55%, 0.7)`} />
                        <stop offset="100%" stopColor={`hsla(${hue}, 90%, 55%, 0)`} />
                      </radialGradient>
                    </defs>
                    <circle cx={x} cy={y} r={110} fill={`url(#${id})`} style={{ mixBlendMode: "screen" }} />
                  </g>
                );
              })}
            </g>
          )}

          {layers.attractions && (
            <g key={animKey}>
              {visible.map((a, i) => {
                const [x, y] = project(a.coords[0], a.coords[1]);
                const cat = CATEGORY_META[a.category];
                const isActive = activePin?.name === a.name;
                const delay = i * 110;
                return (
                  <g key={a.name} transform={`translate(${x}, ${y})`}
                     onClick={(e) => { e.stopPropagation(); setActivePin(a); }}
                     style={{ cursor: "pointer" }}>
                    <g style={{ animation: `im-pin-drop 700ms cubic-bezier(.34,1.56,.64,1) ${delay}ms both` }}>
                      <circle r={14} fill={`hsl(${cat.color})`} opacity={0.35}>
                        <animate attributeName="r" values="10;20;10" dur="2.2s" repeatCount="indefinite" begin={`${delay}ms`} />
                        <animate attributeName="opacity" values="0.35;0;0.35" dur="2.2s" repeatCount="indefinite" begin={`${delay}ms`} />
                      </circle>
                      <circle r={10} fill="url(#pin-glow)" />
                      <path d="M0,-22 C7,-22 11,-16 11,-11 C11,-3 0,8 0,8 C0,8 -11,-3 -11,-11 C-11,-16 -7,-22 0,-22 Z"
                            fill={`hsl(${cat.color})`} stroke="#fff" strokeWidth={1.5}
                            style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.35))" }} />
                      <circle cx={0} cy={-12} r={3.5} fill="#fff" />
                      {isActive && (
                        <circle r={18} fill="none" stroke="#fff" strokeWidth={2} opacity={0.9}>
                          <animate attributeName="r" values="14;22;14" dur="1.2s" repeatCount="indefinite" />
                        </circle>
                      )}
                    </g>
                  </g>
                );
              })}
            </g>
          )}
        </ComposableMap>

        {activePin && (
          <div className="im-info">
            <div className="im-info-dot" style={{ background: `hsl(${CATEGORY_META[activePin.category].color})` }}>📍</div>
            <div className="im-info-body">
              <h3>{activePin.name}</h3>
              <p>{activePin.detail}</p>
              <span className="im-info-tag">{CATEGORY_META[activePin.category].label}</span>
            </div>
            <button className="im-iconbtn small" onClick={() => setActivePin(null)} aria-label="Close info">✕</button>
          </div>
        )}

        {layers.attractions && (
          <div className="im-filters">
            {Object.keys(CATEGORY_META).map((c) => {
              const meta = CATEGORY_META[c];
              const on = filters[c];
              return (
                <button key={c}
                  className={`im-chip ${on ? "on" : ""}`}
                  style={on ? { background: `hsl(${meta.color})` } : undefined}
                  onClick={() => setFilters((f) => ({ ...f, [c]: !f[c] }))}>
                  {meta.label}
                </button>
              );
            })}
          </div>
        )}

        {layers.temperature && (
          <div className="im-legend top-right">
            <div className="im-legend-title">Temp °C</div>
            <div className="im-legend-bar" style={{ background: "linear-gradient(to right, hsl(220,90%,55%), hsl(170,90%,50%), hsl(60,90%,55%), hsl(20,90%,55%), hsl(0,90%,55%))" }} />
            <div className="im-legend-row"><span>20</span><span>32</span><span>45</span></div>
          </div>
        )}
        {layers.economy && (
          <div className="im-legend bottom-right">
            <div className="im-legend-title">Economic value</div>
            <div className="im-legend-bar" style={{ background: `linear-gradient(to right, hsla(${data.baseColor}, 0.15), hsla(${data.baseColor}, 0.95))` }} />
            <div className="im-legend-row"><span>Low</span><span>High</span></div>
          </div>
        )}

        <div className="im-fabs">
          <Fab label="Attractions" icon="📍" active={layers.attractions} onClick={() => toggleLayer("attractions")} color="217 91% 60%" />
          <Fab label="Temperature" icon="🌡️" active={layers.temperature} onClick={() => toggleLayer("temperature")} color="0 85% 60%" />
          <Fab label="Economy" icon="📊" active={layers.economy} onClick={() => toggleLayer("economy")} color={data.baseColor} />
        </div>
      </div>
    </div>
  );
}

function Fab({ label, icon, active, onClick, color }) {
  return (
    <button
      className={`im-fab ${active ? "active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      style={active ? { background: `hsl(${color})`, boxShadow: `0 8px 24px -8px hsla(${color}, 0.7)` } : undefined}
    >
      <span className="im-fab-icon">{icon}</span>
      <span className="im-fab-label">{label}</span>
    </button>
  );
}
