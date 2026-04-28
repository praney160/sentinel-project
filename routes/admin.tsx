import { createFileRoute } from "@tanstack/react-router";
import { Activity, Users, Siren, MapPin, TrendingUp, TrendingDown, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Sentinel Live" },
      { name: "description", content: "Command center for disaster response: incidents, response teams, regional load, and citizen reports." },
    ],
  }),
});

const kpis = [
  { label: "Active Incidents", value: "23", delta: "+4", trend: "up", icon: Siren, tone: "text-sos" },
  { label: "Citizens Online", value: "12,847", delta: "+312", trend: "up", icon: Users, tone: "text-primary" },
  { label: "Response Teams", value: "18 / 24", delta: "75%", trend: "up", icon: Activity, tone: "text-success" },
  { label: "Avg Response", value: "6.2 min", delta: "-0.8m", trend: "down", icon: Clock, tone: "text-info" },
];

const regions = [
  { name: "Mumbai – Western Suburbs", load: 82, status: "Critical", incidents: 9 },
  { name: "Mumbai – South", load: 54, status: "Elevated", incidents: 4 },
  { name: "Thane District", load: 38, status: "Normal", incidents: 3 },
  { name: "Navi Mumbai", load: 27, status: "Normal", incidents: 2 },
  { name: "Raigad", load: 61, status: "Elevated", incidents: 5 },
];

const incidents = [
  { id: "SNL-83417", type: "SOS", location: "Andheri W", responder: "Unit 14", status: "Dispatched", time: "2m" },
  { id: "SNL-83412", type: "Flood", location: "Kurla W", responder: "NDRF-3", status: "On scene", time: "18m" },
  { id: "SNL-83406", type: "Fire", location: "Powai Ind.", responder: "FB-07", status: "Containing", time: "1h" },
  { id: "SNL-83401", type: "Medical", location: "Bandra E", responder: "Amb-22", status: "Resolved", time: "2h" },
  { id: "SNL-83395", type: "Traffic", location: "Sea Link", responder: "TP-09", status: "On scene", time: "2h" },
];

const teams = [
  { name: "NDRF Battalion 3", members: 24, status: "Deployed" },
  { name: "Fire Brigade · Andheri", members: 12, status: "Standby" },
  { name: "Medical · KEM Hospital", members: 18, status: "Deployed" },
  { name: "Volunteer NGO · Goonj", members: 36, status: "Mobilizing" },
];

const statusTone: Record<string, string> = {
  Critical: "bg-sos/15 text-sos border-sos/30",
  Elevated: "bg-warning/15 text-warning border-warning/30",
  Normal: "bg-success/15 text-success border-success/30",
  Dispatched: "bg-sos/15 text-sos border-sos/30",
  "On scene": "bg-warning/15 text-warning border-warning/30",
  Containing: "bg-warning/15 text-warning border-warning/30",
  Resolved: "bg-success/15 text-success border-success/30",
  Deployed: "bg-primary/15 text-primary border-primary/30",
  Standby: "bg-muted text-muted-foreground border-border",
  Mobilizing: "bg-info/15 text-info border-info/30",
};

function AdminPage() {
  return (
    <div className="px-6 py-8 lg:px-10 lg:py-12 max-w-7xl mx-auto">
      <header className="mb-8 animate-fade-up">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-live-dot" />
          Command Center
        </div>
        <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">Admin Dashboard</h1>
        <p className="mt-2 text-muted-foreground max-w-xl">
          Unified view of incidents, response teams, and regional load across the Sentinel network.
        </p>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((k, i) => (
          <Card key={k.label} className="p-5 bg-card border-border/60 animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <div className={`h-9 w-9 rounded-lg bg-secondary flex items-center justify-center ${k.tone}`}>
                <k.icon className="h-4 w-4" />
              </div>
              <span className={`text-xs flex items-center gap-1 ${k.trend === "up" ? "text-success" : "text-info"}`}>
                {k.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {k.delta}
              </span>
            </div>
            <div className="text-3xl font-semibold tracking-tight tabular-nums">{k.value}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{k.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Incidents (wide) */}
        <Card className="lg:col-span-2 p-5 bg-card border-border/60 animate-fade-up">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold tracking-tight">Active Incidents</h2>
              <p className="text-xs text-muted-foreground">Live feed · auto-refreshing</p>
            </div>
            <Badge variant="outline" className="bg-sos/10 text-sos border-sos/30">
              {incidents.filter(i => i.status !== "Resolved").length} open
            </Badge>
          </div>
          <div className="overflow-hidden rounded-lg border border-border/60">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="text-left font-medium px-4 py-2.5">ID</th>
                  <th className="text-left font-medium px-4 py-2.5">Type</th>
                  <th className="text-left font-medium px-4 py-2.5">Location</th>
                  <th className="text-left font-medium px-4 py-2.5">Responder</th>
                  <th className="text-left font-medium px-4 py-2.5">Status</th>
                  <th className="text-right font-medium px-4 py-2.5">Time</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((row) => (
                  <tr key={row.id} className="border-t border-border/60 hover:bg-accent/40 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.id}</td>
                    <td className="px-4 py-3 font-medium">{row.type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.location}</td>
                    <td className="px-4 py-3">{row.responder}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={`${statusTone[row.status]} text-[10px] tracking-wider`}>
                        {row.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Teams */}
        <Card className="p-5 bg-card border-border/60 animate-fade-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold tracking-tight">Response Teams</h2>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </div>
          <div className="space-y-3">
            {teams.map((t) => (
              <div key={t.name} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-secondary/40 border border-border/60">
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.members} members</div>
                </div>
                <Badge variant="outline" className={`${statusTone[t.status]} text-[10px] tracking-wider shrink-0`}>
                  {t.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Regional load */}
        <Card className="lg:col-span-2 p-5 bg-card border-border/60 animate-fade-up">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold tracking-tight">Regional Load</h2>
              <p className="text-xs text-muted-foreground">Network capacity utilization</p>
            </div>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {regions.map((r) => (
              <div key={r.name}>
                <div className="flex items-center justify-between mb-1.5 text-sm">
                  <span className="font-medium">{r.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{r.incidents} incidents</span>
                    <Badge variant="outline" className={`${statusTone[r.status]} text-[10px] tracking-wider`}>
                      {r.status}
                    </Badge>
                    <span className="text-xs tabular-nums w-9 text-right text-muted-foreground">{r.load}%</span>
                  </div>
                </div>
                <Progress value={r.load} className="h-1.5" />
              </div>
            ))}
          </div>
        </Card>

        {/* Alert pulse */}
        <Card className="p-5 bg-gradient-surface border-border/60 animate-fade-up">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <h2 className="font-semibold tracking-tight">Today's Pulse</h2>
          </div>
          <div className="space-y-4 mt-2">
            {[
              { label: "SOS triggered", value: 47 },
              { label: "Citizen reports", value: 312 },
              { label: "Verified via Lens", value: 289 },
              { label: "Resolved", value: 41 },
            ].map((p) => (
              <div key={p.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{p.label}</span>
                <span className="font-semibold tabular-nums">{p.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
