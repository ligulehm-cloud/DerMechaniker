import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function TolerancePage() {
  const [nominal, setNominal] = useState("");
  const [tolerance, setTolerance] = useState("");
  const [diameterType, setDiameterType] = useState("outside");
  const [isoClass, setIsoClass] = useState("h7");

  const toleranceRecommendations = [
    { fit: "H7/g6", type: "Spielpassung", color: "green", note: "Feste Lagerung, leicht beweglich" },
    { fit: "H7/f7", type: "Spielpassung", color: "green", note: "Mittlere Spielpassung, feste Bewegung" },
    { fit: "H7/e7", type: "Spielpassung", color: "green", note: "Größere Spielpassung" },
    { fit: "H7/p6", type: "Übergangspassung", color: "yellow", note: "Spielende/leichte Übergangspassung" },
    { fit: "H7/r6", type: "Übergangspassung", color: "yellow", note: "Feste Übergangspassung" },
    { fit: "H7/s6", type: "Presspassung", color: "red", note: "Feste Presspassung" },
    { fit: "H7/u6", type: "Presspassung", color: "red", note: "Starke Presspassung" },
    { fit: "H7/js7", type: "Spielpassung", color: "green", note: "Symmetrische Spielpassung" },
  ];

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-10">
      <h1 className="text-3xl font-bold text-center text-[#004998]">🎯 Toleranzen</h1>

      {/* Eingabe: Nennmaß & Toleranzfeld */}
      <Card className="p-5 space-y-4 border border-[#004998]/30">
        <h2 className="font-semibold text-[#004998]">📏 Nennmaß & Toleranz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">Nennmaß (mm)</Label>
            <Input
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
              placeholder="z.B. 50"
              className="text-lg h-12 border-2 border-slate-200"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">Toleranzfeld</Label>
            <Input
              value={tolerance}
              onChange={(e) => setTolerance(e.target.value)}
              placeholder="z.B. H7"
              className="text-lg h-12 border-2 border-slate-200"
            />
          </div>
        </div>
      </Card>

      {/* Durchmessertyp */}
      <Card className="p-5 space-y-4 border border-[#004998]/30">
        <h2 className="font-semibold text-[#004998]">📐 Durchmessertyp</h2>
        <div className="flex gap-4">
          <button
            className={`flex-1 h-12 border rounded ${diameterType === "outside" ? "bg-[#004998] text-white" : "bg-white border-slate-300"}`}
            onClick={() => setDiameterType("outside")}
          >
            Außendurchmesser
          </button>
          <button
            className={`flex-1 h-12 border rounded ${diameterType === "inside" ? "bg-[#004998] text-white" : "bg-white border-slate-300"}`}
            onClick={() => setDiameterType("inside")}
          >
            Innendurchmesser
          </button>
        </div>
      </Card>

      {/* ISO Toleranzklasse */}
      <Card className="p-5 space-y-4 border border-[#004998]/30">
        <h2 className="font-semibold text-[#004998]">📏 ISO-Toleranzklasse</h2>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {["h6", "h7", "h8", "js7", "f7", "e8", "k6", "m6", "g7", "p6", "r6", "s6"].map((cls) => (
            <button
              key={cls}
              onClick={() => setIsoClass(cls)}
              className={`h-10 rounded border text-sm font-medium ${
                isoClass === cls ? "bg-[#004998] text-white" : "bg-white border-slate-300"
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </Card>

      {/* Toleranzpassungen */}
      <Card className="p-5 space-y-4 border border-[#004998]/30">
        <h2 className="font-semibold text-[#004998]">📊 Toleranzpassungen für Passungen</h2>
        <div className="space-y-3">
          {toleranceRecommendations.map(({ fit, type, note, color }) => (
            <div
              key={fit}
              className={`p-3 rounded-lg border-2 ${
                color === "green"
                  ? "border-green-500 bg-green-50"
                  : color === "yellow"
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-red-500 bg-red-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#004998]">{fit}</span>
                <span
                  className={`text-sm font-medium ${
                    color === "green" ? "text-green-600" : color === "yellow" ? "text-yellow-600" : "text-red-600"
                  }`}
                >
                  {type}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">{note}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
