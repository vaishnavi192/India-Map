import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import topo from "@/data/india-states.json";

interface Props {
  activeStates: string[];
  selected: string | null;
  onSelect: (state: string) => void;
}

const IndiaMap = ({ activeStates, selected, onSelect }: Props) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full h-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1000, center: [82, 23] }}
        width={800}
        height={800}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={topo as any} parseGeometries={(g: any) => g.objects.states.geometries}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name: string = geo.properties.st_nm;
              const isActive = activeStates.includes(name);
              const isSelected = selected === name;
              const isHovered = hovered === name;

              let fill = "hsl(var(--map-default))";
              if (isActive) fill = "hsl(var(--map-active))";
              if (isHovered) fill = "hsl(var(--map-hover))";
              if (isSelected) fill = "hsl(var(--map-active-stroke))";

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHovered(name)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onSelect(name)}
                  style={{
                    default: {
                      fill,
                      stroke: "hsl(var(--map-default-stroke))",
                      strokeWidth: 0.5,
                      outline: "none",
                      transition: "fill 0.2s ease",
                      cursor: "pointer",
                    },
                    hover: {
                      fill: "hsl(var(--map-hover))",
                      stroke: "hsl(var(--map-active-stroke))",
                      strokeWidth: 0.7,
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: "hsl(var(--map-active-stroke))",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default IndiaMap;
