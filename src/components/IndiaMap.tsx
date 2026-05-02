import { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import topo from "@/data/india-states.json";

interface Props {
  activeStates: string[];
  selected: string | null;
  onSelect: (state: string) => void;
}

// Palette of vivid colors mapped via CSS tokens
const PALETTE = [
  "var(--state-1)",
  "var(--state-2)",
  "var(--state-3)",
  "var(--state-4)",
  "var(--state-5)",
  "var(--state-6)",
  "var(--state-7)",
  "var(--state-8)",
  "var(--state-9)",
  "var(--state-10)",
];

// Simple deterministic hash so each state keeps its color
const colorFor = (name: string) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return `hsl(${PALETTE[h % PALETTE.length]})`;
};

const IndiaMap = ({ activeStates, selected, onSelect }: Props) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const colors = useMemo(() => {
    const map: Record<string, string> = {};
    activeStates.forEach((n) => (map[n] = colorFor(n)));
    return map;
  }, [activeStates]);

  return (
    <div className="w-full h-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1000, center: [82, 23] }}
        width={800}
        height={800}
        style={{ width: "100%", height: "auto" }}
      >
        <defs>
          {/* 3D emboss + glossy shine filter */}
          <filter id="emboss" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="blur" />
            <feSpecularLighting
              in="blur"
              surfaceScale="3"
              specularConstant="1.1"
              specularExponent="22"
              lightingColor="#ffffff"
              result="spec"
            >
              <feDistantLight azimuth="135" elevation="55" />
            </feSpecularLighting>
            <feComposite
              in="spec"
              in2="SourceAlpha"
              operator="in"
              result="specClip"
            />
            <feComposite
              in="SourceGraphic"
              in2="specClip"
              operator="arithmetic"
              k1="0"
              k2="1"
              k3="0.85"
              k4="0"
              result="lit"
            />
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="shadowBlur" />
            <feOffset in="shadowBlur" dx="0" dy="1.5" result="shadowOff" />
            <feComponentTransfer in="shadowOff" result="shadow">
              <feFuncA type="linear" slope="0.45" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="lit" />
            </feMerge>
          </filter>

          {/* Glossy gradient overlay (top highlight) */}
          <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
          </linearGradient>

          {/* Glass morphism filter for selected state */}
          <filter id="glass" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="b" />
            <feSpecularLighting
              in="b"
              surfaceScale="4"
              specularConstant="1.4"
              specularExponent="30"
              lightingColor="#ffffff"
              result="s"
            >
              <feDistantLight azimuth="135" elevation="60" />
            </feSpecularLighting>
            <feComposite in="s" in2="SourceAlpha" operator="in" result="sc" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="sc" />
            </feMerge>
          </filter>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="cb" />
            <feMerge>
              <feMergeNode in="cb" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <Geographies geography={topo as any}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name: string = geo.properties.st_nm;
              const isActive = activeStates.includes(name);
              const isSelected = selected === name;
              const isHovered = hovered === name;

              const baseColor = isActive
                ? colors[name]
                : "hsl(var(--map-default))";

              let fill = baseColor;
              if (isHovered && !isSelected) fill = "hsl(var(--map-hover))";
              if (isSelected) fill = "hsla(0, 0%, 100%, 0.35)";

              const filter = isSelected
                ? "url(#glass)"
                : isActive
                ? "url(#emboss)"
                : undefined;

              return (
                <g key={geo.rsmKey}>
                  <Geography
                    geography={geo}
                    onMouseEnter={() => setHovered(name)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => onSelect(name)}
                    style={{
                      default: {
                        fill,
                        stroke: isSelected
                          ? "hsla(0,0%,100%,0.9)"
                          : "hsl(var(--map-default-stroke))",
                        strokeWidth: isSelected ? 1.2 : 0.6,
                        outline: "none",
                        transition: "fill 0.25s ease, stroke 0.25s ease",
                        cursor: "pointer",
                        filter,
                      },
                      hover: {
                        fill: isSelected ? fill : "hsl(var(--map-hover))",
                        stroke: "hsla(0,0%,100%,0.95)",
                        strokeWidth: 1,
                        outline: "none",
                        cursor: "pointer",
                        filter,
                      },
                      pressed: {
                        fill,
                        outline: "none",
                        filter,
                      },
                    }}
                  />
                  {/* Glossy overlay layered on active states */}
                  {isActive && !isSelected && (
                    <Geography
                      geography={geo}
                      style={{
                        default: {
                          fill: "url(#gloss)",
                          stroke: "none",
                          outline: "none",
                          pointerEvents: "none",
                          mixBlendMode: "overlay",
                        },
                        hover: {
                          fill: "url(#gloss)",
                          stroke: "none",
                          outline: "none",
                          pointerEvents: "none",
                          mixBlendMode: "overlay",
                        },
                        pressed: {
                          fill: "url(#gloss)",
                          stroke: "none",
                          outline: "none",
                          pointerEvents: "none",
                        },
                      }}
                    />
                  )}
                </g>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default IndiaMap;
