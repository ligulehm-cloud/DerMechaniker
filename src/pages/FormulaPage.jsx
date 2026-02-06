import React, { useState } from "react";
import FormulaBlock from "@/components/FormulaBlock";
import { Card } from "@/components/ui/card";

const formulas = {
  "Elektrische Arbeit/Energie (W)": {
    formula: "W = U × I × t",
    description: "U in Volt, I in Ampere, t in Sekunden",
    resultLabel: "Arbeit / Energie",
    resultUnit: "Joule (Ws)",
    fields: [
      { name: "U", label: "Spannung U (V)" },
      { name: "I", label: "Strom I (A)" },
      { name: "t", label: "Zeit t (s)" },
    ],
    calculate: ({ U, I, t }) => Number(U) * Number(I) * Number(t),
  },
  "Elektrische Leistung (P)": {
    formula: "P = U × I",
    description: "U in Volt, I in Ampere",
    resultLabel: "Leistung",
    resultUnit: "Watt",
    fields: [
      { name: "U", label: "Spannung U (V)" },
      { name: "I", label: "Strom I (A)" },
    ],
    calculate: ({ U, I }) => Number(U) * Number(I),
  },
  "Leistung mit Widerstand (P)": {
    formula: "P = I² × R",
    description: "I in Ampere, R in Ohm",
    resultLabel: "Leistung",
    resultUnit: "Watt",
    fields: [
      { name: "I", label: "Strom I (A)" },
      { name: "R", label: "Widerstand R (Ω)" },
    ],
    calculate: ({ I, R }) => Math.pow(Number(I), 2) * Number(R),
  },
  "Leitungswiderstand (R)": {
    formula: "R = ρ × l / A",
    description: "ρ in Ω·mm²/m, l in m, A in mm²",
    resultLabel: "Widerstand",
    resultUnit: "Ω",
    fields: [
      { name: "rho", label: "Spezifischer Widerstand ρ (Ω·mm²/m)" },
      { name: "l", label: "Leitungslänge l (m)" },
      { name: "A", label: "Querschnitt A (mm²)" },
    ],
    calculate: ({ rho, l, A }) => (Number(rho) * Number(l)) / Number(A),
  },
  "Ohmsches Gesetz Spannung (U)": {
    formula: "U = R × I",
    description: "R in Ohm, I in Ampere",
    resultLabel: "Spannung",
    resultUnit: "Volt",
    fields: [
      { name: "R", label: "Widerstand R (Ω)" },
      { name: "I", label: "Strom I (A)" },
    ],
    calculate: ({ R, I }) => Number(R) * Number(I),
  },
  "Ohmsches Gesetz Stromstärke (I)": {
    formula: "I = U / R",
    description: "U in Volt, R in Ohm",
    resultLabel: "Strom",
    resultUnit: "Ampere",
    fields: [
      { name: "U", label: "Spannung U (V)" },
      { name: "R", label: "Widerstand R (Ω)" },
    ],
    calculate: ({ U, R }) => Number(U) / Number(R),
  },
  "Ohmsches Gesetz Widerstand (R)": {
    formula: "R = U / I",
    description: "U in Volt, I in Ampere",
    resultLabel: "Widerstand",
    resultUnit: "Ohm",
    fields: [
      { name: "U", label: "Spannung U (V)" },
      { name: "I", label: "Strom I (A)" },
    ],
    calculate: ({ U, I }) => Number(U) / Number(I),
  },
  "Scheinleistung (S)": {
    formula: "S = U × I",
    description: "U in Volt, I in Ampere",
    resultLabel: "Scheinleistung",
    resultUnit: "VA",
    fields: [
      { name: "U", label: "Spannung U (V)" },
      { name: "I", label: "Strom I (A)" },
    ],
    calculate: ({ U, I }) => Number(U) * Number(I),
  },
  "Wirkleistung (P)": {
    formula: "P = U × I × cosφ",
    description: "U in Volt, I in Ampere, cosφ Leistungsfaktor",
    resultLabel: "Wirkleistung",
    resultUnit: "Watt",
    fields: [
      { name: "U", label: "Spannung U (V)" },
      { name: "I", label: "Strom I (A)" },
      { name: "cosphi", label: "Leistungsfaktor cosφ" },
    ],
    calculate: ({ U, I, cosphi }) => Number(U) * Number(I) * Number(cosphi),
  },
  "Drehmoment (M)": {
    formula: "M = F × r",
    description: "F in N, r in m",
    resultLabel: "Drehmoment",
    resultUnit: "Nm",
    fields: [
      { name: "F", label: "Kraft F (N)" },
      { name: "r", label: "Hebelarm r (m)" },
    ],
    calculate: ({ F, r }) => Number(F) * Number(r),
  },
  "Kraft (F)": {
    formula: "F = m × a",
    description: "m in kg, a in m/s²",
    resultLabel: "Kraft",
    resultUnit: "N",
    fields: [
      { name: "m", label: "Masse m (kg)" },
      { name: "a", label: "Beschleunigung a (m/s²)" },
    ],
    calculate: ({ m, a }) => Number(m) * Number(a),
  },
  "Flüssigkeiten mischen – Endkonzentration": {
    formula: "C = (V₁ × C₁ + V₂ × C₂) / (V₁ + V₂)",
    description: "V in Liter, C in %",
    resultLabel: "Endkonzentration",
    resultUnit: "%",
    fields: [
      { name: "V1", label: "Volumen 1 (L)" },
      { name: "C1", label: "Konzentration 1 (%)" },
      { name: "V2", label: "Volumen 2 (L)" },
      { name: "C2", label: "Konzentration 2 (%)" },
    ],
    calculate: ({ V1, C1, V2, C2 }) => {
      const v1 = Number(V1);
      const c1 = Number(C1);
      const v2 = Number(V2);
      const c2 = Number(C2);
      const total = v1 + v2;
      if (total === 0) return 0;
      return ((v1 * c1 + v2 * c2) / total).toFixed(2);
    },
  },
  "Flüssigkeiten mischen – Zielkonzentration": {
    formula: "V₂ = (V₁ × (C₁ − Cz)) / (Cz − C₂)",
    description: "Mischung mit Zielkonzentration (alle Angaben in %, V in L)",
    resultLabel: "Benötigtes Volumen V₂",
    resultUnit: "L",
    fields: [
      { name: "V1", label: "Volumen 1 (L)" },
      { name: "C1", label: "Konzentration 1 (%)" },
      { name: "C2", label: "Konzentration 2 (%)" },
      { name: "Cz", label: "Zielkonzentration (%)" },
    ],
    calculate: ({ V1, C1, C2, Cz }) => {
      const v1 = Number(V1);
      const c1 = Number(C1);
      const c2 = Number(C2);
      const cz = Number(Cz);
      if (cz === c2) return NaN;
      return ((v1 * (c1 - cz)) / (cz - c2)).toFixed(2);
    },
  },
};

export default function FormulaPage() {
  const [selected, setSelected] = useState("");

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-10">
      <h1 className="text-3xl font-bold text-center text-[#004998]">📘 Formeln & Berechnungen</h1>

      <Card className="p-5 border border-[#004998]/30 space-y-3">
        <label className="text-sm font-medium text-slate-700">Formel wählen</label>
        <select
          className="w-full h-12 border-2 border-slate-200 rounded px-3 text-lg"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">Formel auswählen…</option>
          {Object.keys(formulas).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </Card>

      {selected && (
        <FormulaBlock
          {...formulas[selected]}
          values={{}}
          setValues={() => {}}
          calculate={formulas[selected].calculate}
        />
      )}
    </div>
  );
}