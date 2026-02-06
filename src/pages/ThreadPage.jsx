import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function ThreadPage() {
  const [threadType, setThreadType] = useState("M"); // M, Mf, G, etc.
  const [threadSide, setThreadSide] = useState("outer"); // outer or inner
  const [nominal, setNominal] = useState("");
  const [pitch, setPitch] = useState("");

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-10">
      <h1 className="text-3xl font-bold text-center text-[#004998]">🔩 Gewinderechner</h1>

      {/* Gewindeart: Außen-/Innengewinde */}
      <Card className="p-5 space-y-4 border border-[#004998]/30">
        <h2 className="font-semibold text-[#004998]">🔧 Gewindeart</h2>
        <div className="flex gap-4">
          <button
            className={`flex-1 h-12 border rounded ${
              threadSide === "outer" ? "bg-[#004998] text-white" : "bg-white border-slate-300"
            }`}
            onClick={() => setThreadSide("outer")}
          >
            Außengewinde
          </button>
          <button
            className={`flex-1 h-12 border rounded ${
              threadSide === "inner" ? "bg-[#004998] text-white" : "bg-white border-slate-300"
            }`}
            onClick={() => setThreadSide("inner")}
          >
            Innengewinde
          </button>
        </div>
      </Card>

      {/* Gewindetyp-Auswahl */}
      <Card className="p-5 space-y-4 border border-[#004998]/30">
        <h2 className="font-semibold text-[#004998]">📘 Gewindetyp</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { label: "M", title: "Metrisches Gewinde" },
            { label: "Mf", title: "Feingewinde DIN 13" },
            { label: "W", title: "Whitworth-Gewinde" },
            { label: "G", title: "Rohrgewinde zylindrisch" },
            { label: "R", title: "Rohrgewinde konisch" },
            { label: "Rp", title: "Rohrgewinde zyl. innen" },
          ].map(({ label, title }) => (
            <button
              key={label}
              onClick={() => setThreadType(label)}
              className={`h-10 rounded border text-sm font-medium ${
                threadType === label ? "bg-[#004998] text-white" : "bg-white border-slate-300"
              }`}
              title={title}
            >
              {label}
            </button>
          ))}
        </div>
      </Card>

      {/* Gewindeberechnung */}
      <Card className="p-5 space-y-4 border border-[#004998]/30">
        <h2 className="font-semibold text-[#004998]">🧮 Gewindeberechnung</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">Nenndurchmesser (mm)</Label>
            <Input
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
              placeholder="z.B. M10"
              className="text-lg h-12 border-2 border-slate-200"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">Steigung (mm)</Label>
            <Input
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              placeholder="z.B. 1.5"
              className="text-lg h-12 border-2 border-slate-200"
            />
          </div>
        </div>
      </Card>

      {/* Gewinde suchen */}
      <Card className="p-5 space-y-4 border border-[#004998]/30">
        <h2 className="font-semibold text-[#004998]">🔎 Gewinde suchen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">Durchmesser (mm)</Label>
            <Input
              placeholder="z.B. 10"
              className="text-lg h-12 border-2 border-slate-200"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">Steigung (mm)</Label>
            <Input
              placeholder="z.B. 1.5"
              className="text-lg h-12 border-2 border-slate-200"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
