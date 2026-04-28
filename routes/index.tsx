import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Siren, MapPin, Phone, Flame, Shield as ShieldIcon, Heart, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: SOSPage,
  head: () => ({
    meta: [
      { title: "SOS Interface — Sentinel Live" },
      { name: "description", content: "One-tap emergency SOS with live location sharing and instant dispatch to first responders." },
    ],
  }),
});

const services = [
  { name: "Medical Emergency", number: "108", icon: Heart, tone: "text-sos" },
  { name: "Fire Department", number: "101", icon: Flame, tone: "text-warning" },
  { name: "Police", number: "100", icon: ShieldIcon, tone: "text-info" },
  { name: "Emergency Services", number: "112", icon: Phone, tone: "text-primary" },
];

function SOSPage() {
  const [activated, setActivated] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-12 max-w-7xl mx-auto">
      <header className="mb-10 animate-fade-up">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-sos animate-live-dot" />
          Emergency Interface
        </div>
        <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">SOS</h1>
        <p className="mt-2 text-muted-foreground max-w-xl">
          Hold the button to broadcast your location to nearby responders, NGOs, and the Sentinel command center.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Main SOS */}
        <Card className="relative overflow-hidden bg-gradient-surface border-border/60 p-10 lg:p-14 flex flex-col items-center justify-center min-h-[480px] shadow-elegant animate-fade-up">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,oklch(0.62_0.24_22/0.12),transparent_60%)] pointer-events-none" />

          {!activated ? (
            <>
              <button
                onClick={() => setActivated(true)}
                className="relative h-56 w-56 rounded-full bg-gradient-sos animate-sos-pulse flex flex-col items-center justify-center text-sos-foreground transition-transform hover:scale-[1.03] active:scale-95"
                aria-label="Activate emergency SOS"
              >
                <Siren className="h-16 w-16 mb-2" />
                <span className="text-2xl font-bold tracking-widest">SOS</span>
                <span className="text-xs uppercase tracking-[0.25em] opacity-80 mt-1">Tap to activate</span>
              </button>
              <p className="mt-10 text-sm text-muted-foreground text-center max-w-sm">
                Your live location, profile and emergency contacts will be shared instantly with the closest response unit.
              </p>
            </>
          ) : !confirmed ? (
            <div className="relative w-full max-w-md text-center animate-fade-up">
              <div className="mx-auto h-20 w-20 rounded-full bg-sos/20 border border-sos/40 flex items-center justify-center mb-6">
                <Siren className="h-10 w-10 text-sos" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Emergency SOS Activated</h2>
              <p className="text-muted-foreground mb-8 text-sm">
                Confirm to dispatch responders to your live location in <span className="text-foreground font-medium">Andheri West, Mumbai</span>.
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  size="lg"
                  className="bg-sos hover:bg-sos/90 text-sos-foreground shadow-sos px-8"
                  onClick={() => setConfirmed(true)}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" /> Confirm Emergency
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActivated(false)}>
                  <X className="h-4 w-4 mr-2" /> Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative w-full max-w-md text-center animate-fade-up">
              <div className="mx-auto h-20 w-20 rounded-full bg-success/20 border border-success/40 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Help is on the way</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Unit dispatched · ETA 6 minutes · Tracking ID #SNL-83417
              </p>
              <Button variant="outline" onClick={() => { setActivated(false); setConfirmed(false); }}>
                Reset
              </Button>
            </div>
          )}
        </Card>

        {/* Side panel */}
        <div className="space-y-4 animate-fade-up">
          <Card className="p-5 bg-card border-border/60">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-3">
              <MapPin className="h-3.5 w-3.5" /> Current location
            </div>
            <p className="font-medium">Andheri West, Mumbai</p>
            <p className="text-sm text-muted-foreground">19.1364° N, 72.8296° E</p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div><div className="text-lg font-semibold">28°</div><div className="text-[10px] uppercase tracking-wider text-muted-foreground">Temp</div></div>
              <div><div className="text-lg font-semibold text-warning">Heavy</div><div className="text-[10px] uppercase tracking-wider text-muted-foreground">Rain</div></div>
              <div><div className="text-lg font-semibold">86%</div><div className="text-[10px] uppercase tracking-wider text-muted-foreground">Humidity</div></div>
            </div>
          </Card>

          <Card className="p-5 bg-card border-border/60">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Emergency Services</div>
            <div className="space-y-1">
              {services.map((s) => (
                <button
                  key={s.number}
                  className="w-full flex items-center justify-between rounded-lg px-3 py-3 hover:bg-accent transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-md bg-secondary flex items-center justify-center">
                      <s.icon className={`h-4 w-4 ${s.tone}`} />
                    </div>
                    <span className="text-sm font-medium">{s.name}</span>
                  </div>
                  <span className="text-sm font-semibold tabular-nums">{s.number}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
