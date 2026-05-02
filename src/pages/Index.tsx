import { useMemo, useRef, useState } from "react";
import IndiaMap from "@/components/IndiaMap";
import StateCard from "@/components/StateCard";
import { STATES } from "@/data/states";

const Index = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const activeStates = useMemo(() => STATES.map((s) => s.name), []);

  const handleSelect = (name: string) => {
    setSelected(name);
    const el = cardRefs.current[name];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Interactive India Map
          </h1>
          <p className="mt-2 text-muted-foreground">
            Click any highlighted state to explore. {STATES.length} states live.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-panel-border bg-panel p-4 shadow-sm">
            <IndiaMap
              activeStates={activeStates}
              selected={selected}
              onSelect={handleSelect}
            />
          </div>

          <aside className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-1">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-live px-2 py-1 text-xs font-semibold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                LIVE
              </span>
              <span className="text-sm font-semibold text-foreground">
                {STATES.length} states
              </span>
            </div>

            <div className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto pr-1">
              {STATES.map((s) => (
                <div
                  key={s.name}
                  ref={(el) => (cardRefs.current[s.name] = el)}
                >
                  <StateCard
                    state={s}
                    selected={selected === s.name}
                    onClick={() => setSelected(s.name)}
                  />
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Index;
