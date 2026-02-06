import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function TorquePage() {
  const [size, setSize] = useState("");
  const [materialClass, setMaterialClass] = useState("");
  const [lubrication, setLubrication] = useState("trocken");

  // Beispielwerte für das Drehmoment (Nm)
  const torqueTable = {
    M6: { "8.8": { trocken: 10, geschmiert: 7 }, "10.9": { trocken: 13, geschmiert: 9 } },
    M8: { "8.8": { trocken: 25, geschmiert: 18 }, "10.9": { trocken: 30, geschmiert: 22 } },
    M10: { "8.8": { trocken: 50, geschmiert: 36 }, "10.9": { trocken: 60, geschmiert: 44 } },
    M12: { "8.8": { trocken: 85, geschmiert: 62 }, "10.9": { trocken: 100, geschmiert: 74 } },
    M16: { "8.8": { trocken: 210, geschmiert: 150 }, "10.9": { trocken: 260, geschmiert: 190 } },
  };

  const calculatedTorque =
    torqueTable[size]?.[materialClass]?.[lubrication] ?? null;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-10">
      <h1 className="text-3xl font-bold text-center text-[#004998]">🔩 Drehmomentberechnung</h1>

      <Card className="p-5 space-y-6 border border-[#004998]/30">
        <h2 className="font-semibold text-[#004998]">🔧 Schraubengröße</h2>
        <select
          className="w-full h-12 border-2 border-slate-200 rounded px-3 text-lg"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">Größe wählen…</option>
          <option value="M6">M6</option>
          <option value="M8">M8</option>
          <option value="M10">M10</option>
          <option value="M12">M12</option>
          <option value="M16">M16</option>
        </select>

        <div>
          <Label className="text-sm font-medium text-slate-700">Material / Festigkeitsklasse</Label>
          <select
            className="w-full h-12 border-2 border-slate-200 rounded px-3 text-lg"
            value={materialClass}
            onChange={(e) => setMaterialClass(e.target.value)}
          >
            <option value="">Material wählen…</option>
            <option value="8.8">Stahl 8.8</option>
            <option value="10.9">Stahl 10.9</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-700">Schmierungszustand</Label>
          <div className="flex gap-4">
            <button
              className={`flex-1 h-12 rounded border ${
                lubrication === "trocken" ? "bg-[#004998] text-white" : "border-slate-300 bg-white"
              }`}
              onClick={() => setLubrication("trocken")}
            >
              Trocken
            </button>
            <button
              className={`flex-1 h-12 rounded border ${
                lubrication === "geschmiert" ? "bg-[#004998] text-white" : "border-slate-300 bg-white"
              }`}
              onClick={() => setLubrication("geschmiert")}
            >
              Geschmiert
            </button>
          </div>
        </div>

        {calculatedTorque !== null && (
          <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded text-center">
            <div className="text-lg text-slate-700 font-semibold">
              🔧 Empfohlenes Anziehdrehmoment:
            </div>
            <div className="text-3xl font-bold text-green-700 mt-1">
              {calculatedTorque} Nm
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
