import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, CloudRain, Car, Flame, Wind, Navigation, Share2, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/alerts")({
  component: AlertsPage,
  head: () => ({
    meta: [
      { title: "Live Alerts — Sentinel Live" },
      { name: "description", content: "Real-time disaster, weather, and traffic alerts streamed from verified citizen reports and IoT sensors." },
    ],
  }),
});

type Severity = "HIGH" | "MEDIUM" | "LOW";
type Alert = {
  id: string; title: string; severity: Severity; category: string;
  location: string; distance: string; time: string; description: string; source: string; icon: typeof CloudRain;
};

const alerts: Alert[] = [
  { id: "1", title: "Flood Alert", severity: "HIGH", category: "Weather", location: "Andheri, Mumbai", distance: "2.2 km", time: "15 min ago", description: "Heavy rainfall causing waterlogging in Andheri area. Avoid travel if possible.", source: "Mumbai Traffic Police", icon: CloudRain },
  { id: "2", title: "Traffic Alert", severity: "MEDIUM", category: "Traffic", location: "Bandra-Worli Sea Link", distance: "8.5 km", time: "32 min ago", description: "Heavy traffic due to weather conditions. Use alternate routes via Western Express.", source: "Traffic Control", icon: Car },
  { id: "3", title: "Fire Incident", severity: "HIGH", category: "Fire", location: "Powai Industrial Area", distance: "11.4 km", time: "1 h ago", description: "Warehouse fire reported. Fire department on scene. Avoid Powai Lake Road.", source: "Mumbai Fire Brigade", icon: Flame },
  { id: "4", title: "Wind Advisory", severity: "LOW", category: "Weather", location: "Versova Coastline", distance: "4.8 km", time: "2 h ago", description: "Strong coastal winds expected through evening. Secure loose objects on terraces.", source: "IMD Mumbai", icon: Wind },
  { id: "5", title: "Localized Flooding", severity: "MEDIUM", category: "Weather", location: "Kurla West", distance: "13.1 km", time: "3 h ago", description: "Citizen reports of knee-deep water near LBS Marg. Verified via Camera Lens.", source: "Citizen Report · Verified", icon: CloudRain },
];

const severityStyles: Record<Severity, string> = {
  HIGH: "bg-sos/15 text-sos border-sos/30",
  MEDIUM: "bg-warning/15 text-warning border-warning/30",
  LOW: "bg-info/15 text-info border-info/30",
};

const filters = ["All", "HIGH", "MEDIUM", "LOW"] as const;

function AlertsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = filter === "All" ? alerts : alerts.filter((a) => a.severity === filter);

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-12 max-w-7xl mx-auto">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 animate-fade-up">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-sos animate-live-dot" />
            Streaming live
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">Live Alerts</h1>
          <p className="mt-2 text-muted-foreground max-w-xl">
            Verified incidents within a 15 km radius. Sourced from IoT sensors, official agencies, and citizen reports.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {filters.map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              className="h-8"
            >
              {f}
            </Button>
          ))}
        </div>
      </header>

      {/* Summary strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8 animate-fade-up">
        {[
          { label: "Active alerts", value: alerts.length, tone: "text-foreground" },
          { label: "High severity", value: alerts.filter(a => a.severity === "HIGH").length, tone: "text-sos" },
          { label: "Citizen reports", value: 12, tone: "text-primary" },
          { label: "Responders deployed", value: 8, tone: "text-success" },
        ].map((s) => (
          <Card key={s.label} className="p-4 bg-card border-border/60">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            <div className={`text-2xl font-semibold mt-1 tabular-nums ${s.tone}`}>{s.value}</div>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {visible.map((a, i) => (
          <Card
            key={a.id}
            className="p-5 bg-card border-border/60 hover:border-border transition-colors animate-fade-up"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="flex gap-4">
              <div className={`h-11 w-11 shrink-0 rounded-lg flex items-center justify-center border ${severityStyles[a.severity]}`}>
                <a.icon className="h-5 w-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold tracking-tight">{a.title}</h3>
                  <Badge variant="outline" className={`${severityStyles[a.severity]} text-[10px] tracking-wider`}>
                    {a.severity}
                  </Badge>
                  <span className="text-xs text-muted-foreground">· {a.category}</span>
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  {a.location} · {a.distance} away · {a.time}
                </div>
                <p className="text-sm text-foreground/90">{a.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground">Source: <span className="text-foreground/80">{a.source}</span></span>
                  <div className="ml-auto flex gap-2">
                    <Button size="sm" variant="outline" className="h-8">
                      <Navigation className="h-3.5 w-3.5 mr-1.5" /> Navigate
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8">
                      <Share2 className="h-3.5 w-3.5 mr-1.5" /> Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {visible.length === 0 && (
          <Card className="p-10 text-center text-muted-foreground border-dashed">
            <AlertTriangle className="h-6 w-6 mx-auto mb-2 opacity-50" />
            No alerts matching this filter.
          </Card>
        )}
      </div>
    </div>
  );
}
