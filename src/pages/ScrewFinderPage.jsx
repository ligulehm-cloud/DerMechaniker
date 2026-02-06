import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ScrewFinderPage() {
  const [inputValue, setInputValue] = useState("");
  const [mode, setMode] = useState("hex"); // 'hex' = Schlüsselweite, 'inbus' = Innensechskant

  const hexMap = {
    M3: 5.5,
    M4: 7,
    M5: 8,
    M6: 10,
    M8: 13,
    M10: 17,
    M12: 19,
    M14: 22,
    M16: 24,
    M18: 27,
    M20: 30,
    M22: 32,
    M24: 36,
    M27: 41,
    M30: 46,
    M33: 50,
    M36: 55,
    M39: 60,
    M42: 65,
    M45: 70,
  };

  const inbusMap = {
    M3: 2.5,
    M4: 3,
    M5: 4,
    M6: 5,
    M8: 6,
    M10: 8,
    M12: 10,
    M14: 12,
    M16: 14,
    M18: 14, // manchmal gleich wie M16
    M20: 17,
    M22: 17,
    M24: 19,
    M27: 19,
    M30: 22,
    M33: 22,
    M36: 24,
    M39: 24,
    M42: 27,
    M45: 27,
  };

  const dataMap = mode === "hex" ? hexMap : inbusMap;

  const results = Object.entries(dataMap)
    .filter(([_, size]) => Math.abs(Number(inputValue) - size) < 0.6) // ±0.5 mm Toleranz
    .map(([thread, size]) => ({ thread, size }));

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-8 px-4">
      <h1 className="text-3xl font-bold text-center text-[#004998]">🔍 Schrauben-Finder</h1>

      {/* Auswahl: Art der Messung */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-700">Was wurde gemessen?</Label>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded border-2 ${
              mode === "hex"
                ? "bg-[#004998] text-white border-[#004998]"
                : "border-slate-300 text-slate-600"
            }`}
            onClick={() => setMode("hex")}
          >
            Schlüsselweite (Außensechskant)
          </button>
          <button
            className={`px-4 py-2 rounded border-2 ${
              mode === "inbus"
                ? "bg-[#004998] text-white border-[#004998]"
                : "border-slate-300 text-slate-600"
            }`}
            onClick={() => setMode("inbus")}
          >
            Inbus (Innensechskant)
          </button>
        </div>
      </div>

      {/* Eingabe */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-700">
          Gemessener Wert (in mm)
        </Label>
        <Input
          type="number"
          placeholder="z.B. 13"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="text-lg h-12 border-2 border-slate-200"
          step="0.1"
        />
      </div>

      {/* Ergebnisse */}
      {inputValue && results.length > 0 ? (
        <div className="p-4 bg-[#004998]/10 border-2 border-[#004998] rounded-lg space-y-2">
          <h3 className="font-semibold text-[#004998] text-center mb-2">
            Mögliche Gewindegrößen
          </h3>
          <ul className="space-y-1 text-center">
            {results.map(({ thread, size }) => (
              <li key={thread}>
                <span className="font-bold
