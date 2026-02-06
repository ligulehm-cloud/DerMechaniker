import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormulaBlock from "@/components/FormulaBlock";

export default function CuttingPage() {
  const [formulaInputs, setFormulaInputs] = useState({});

  // Material → vc automatisch / Material+Tool → fz Vorschlag / vc + d → n automatisch
  useEffect(() => {
    if (formulaInputs.vc && formulaInputs.d) {
      const n = (1000 * Number(formulaInputs.vc)) / (Math.PI * Number(formulaInputs.d));
      setFormulaInputs((prev) => ({ ...prev, n: Math.round(n) }));
    }

    if (formulaInputs.material && formulaInputs.toolMaterial) {
      const fzPresets = {
        hss: {
          stahl: 0.07,
          edelstahl: 0.05,
          aluminium: 0.15,
          kunststoff: 0.2,
        },
        hartmetall: {
          stahl: 0.15,
          edelstahl: 0.10,
          aluminium: 0.25,
          kunststoff: 0.3,
        },
      };
      const mat = formulaInputs.material;
      const tool = formulaInputs.toolMaterial;
      const fz = fzPresets[tool]?.[mat];
      if (fz) {
        setFormulaInputs((prev) => ({ ...prev, fz }));
      }
    }
  }, [formulaInputs.vc, formulaInputs.d, formulaInputs.material, formulaInputs.toolMaterial]);

  const materialPresets = {
    stahl: 25,
    edelstahl: 18,
    aluminium: 100,
    kunststoff: 120,
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-10 px-4">
      <h1 className="text-3xl font-bold text-center text-[#004998]">🌀 Drehzahlen & Vorschub</h1>

      {/* Werkzeugmaterial-Auswahl */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-slate-700">Werkzeugmaterial</Label>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded border-2 ${
              formulaInputs.toolMaterial === "hss"
                ? "bg-[#004998] text-white border-[#004998]"
                : "border-slate-300 text-slate-600"
            }`}
            onClick={() => setFormulaInputs({ ...formulaInputs, toolMaterial: "hss" })}
          >
            HSS
          </button>
          <button
            className={`px-4 py-2 rounded border-2 ${
              formulaInputs.toolMaterial === "hartmetall"
                ? "bg-[#004998] text-white border-[#004998]"
                : "border-slate-300 text-slate-600"
            }`}
            onClick={() => setFormulaInputs({ ...formulaInputs, toolMaterial: "hartmetall" })}
          >
            Hartmetall
          </button>
        </div>
      </div>

      {/* Materialauswahl + vc Preset */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-slate-700">Material auswählen</Label>
        <select
          className="w-full h-12 border-2 border-slate-200 text-lg rounded px-3"
          value={formulaInputs.material || ""}
          onChange={(e) => {
            const mat = e.target.value;
            setFormulaInputs({
              ...formulaInputs,
              material: mat,
              vc: materialPresets[mat] || "",
            });
          }}
        >
          <option value="">Material wählen…</option>
          <option value="stahl">Stahl (25 m/min)</option>
          <option value="edelstahl">Edelstahl (18 m/min)</option>
          <option value="aluminium">Aluminium (100 m/min)</option>
          <option value="kunststoff">Kunststoff (120 m/min)</option>
        </select>
      </div>

      {/* Drehzahl + Vorschubgeschwindigkeit */}
      <FormulaBlock
        formula="n = (1000 × vc) / (π × d)"
        description="n in U/min, vc in m/min, d in mm"
        resultLabel="Drehzahl"
        resultUnit="U/min"
        fields={[
          { name: "vc", label: "Schnittgeschwindigkeit vc (m/min)", placeholder: "z.B. 150" },
          { name: "d", label: "Werkzeugdurchmesser d (mm)", placeholder: "z.B. 10" },
          { name: "f", label: "Vorschub f (mm/U)", placeholder: "Optional: z.B. 0.2", optional: true },
        ]}
        values={formulaInputs}
        setValues={setFormulaInputs}
        calculate={({ vc, d }) => (1000 * Number(vc)) / (Math.PI * Number(d))}
        extraResult={({ vc, d, f }) => {
          if (vc && d && f) {
            const n = (1000 * Number(vc)) / (Math.PI * Number(d));
            const Vf = Number(f) * n;
            return {
              label: "Vorschubgeschwindigkeit",
              value: Vf.toFixed(1),
              unit: "mm/min",
            };
          }
          return null;
        }}
      />

      {/* Vorschub über fz × z × n */}
      <FormulaBlock
        formula="Vf = fz × z × n"
        description="fz in mm/Zahn, z = Zähne, n = Drehzahl"
        resultLabel="Vorschubgeschwindigkeit"
        resultUnit="mm/min"
        fields={[
          { name: "fz", label: "Vorschub pro Zahn fz (mm)", placeholder: "z.B. 0.05" },
          { name: "z", label: "Zähnezahl z", placeholder: "z.B. 4" },
          { name: "n", label: "Drehzahl n (U/min)", placeholder: "z.B. 1500" },
        ]}
        values={formulaInputs}
        setValues={setFormulaInputs}
        calculate={({ fz, z, n }) => Number(fz) * Number(z) * Number(n)}
      />

      {/* Schnittgeschwindigkeit rückwärts berechnen */}
      <FormulaBlock
        formula="vc = (π × d × n) / 1000"
        description="vc in m/min, d in mm, n in U/min"
        resultLabel="Schnittgeschwindigkeit"
        resultUnit="m/min"
        fields={[
          { name: "d", label: "Werkzeugdurchmesser d (mm)", placeholder: "z.B. 10" },
          { name: "n", label: "Drehzahl n (U/min)", placeholder: "z.B. 1500" },
        ]}
        values={formulaInputs}
        setValues={setFormulaInputs}
        calculate={({ d, n }) => (Math.PI * Number(d) * Number(n)) / 1000}
      />
    </div>
  );
}
