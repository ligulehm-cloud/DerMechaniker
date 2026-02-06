import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function FormulaBlock({
  formula,
  description,
  resultLabel,
  resultUnit,
  fields,
  values,
  setValues,
  calculate,
  extraResult,
}) {
  const [result, setResult] = useState(null);

  const handleChange = (e, name) => {
    const newValues = { ...values, [name]: e.target.value };
    setValues(newValues);
    const allFilled = fields.every(f => f.optional || newValues[f.name]);
    if (allFilled) {
      const res = calculate(newValues);
      setResult(res);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="p-5 bg-white border border-slate-200 rounded-lg space-y-4 shadow-sm">
      <div className="space-y-1">
        <p className="font-mono font-semibold text-[#004998] text-center">{formula}</p>
        <p className="text-xs text-slate-500 text-center">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ name, label, placeholder, optional }) => (
          <div key={name} className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">
              {label} {optional && <span className="text-slate-400">(optional)</span>}
            </Label>
            <Input
              type="number"
              step="any"
              value={values[name] || ""}
              onChange={(e) => handleChange(e, name)}
              placeholder={placeholder}
              className="text-lg h-12 border-2 border-slate-200"
            />
          </div>
        ))}
      </div>

      {result !== null && (
        <div className="text-center mt-4">
          <p className="text-slate-600 text-sm">{resultLabel}</p>
          <p className="text-4xl font-bold text-[#004998]">{result.toFixed(2)} <span className="text-xl">{resultUnit}</span></p>
        </div>
      )}

      {extraResult && extraResult(values) && (
        <div className="text-center mt-4">
          <p className="text-slate-600 text-sm">{extraResult(values).label}</p>
          <p className="text-3xl font-semibold text-[#004998]">
            {extraResult(values).value} <span className="text-xl">{extraResult(values).unit}</span>
          </p>
        </div>
      )}
    </div>
  );
}
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function FormulaBlock({
  formula,
  description,
  resultLabel,
  resultUnit,
  fields,
  values,
  setValues,
  calculate,
}) {
  const allFilled = fields.every(
    (field) => values[field.name] !== "" && values[field.name] !== undefined
  );

  const result = allFilled ? calculate(values) : null;

  return (
    <div className="space-y-4">
      {/* Formelanzeige */}
      <div className="p-4 bg-[#004998]/5 rounded-lg border border-[#004998]/20">
        <p className="text-sm text-center font-mono font-bold text-[#004998]">
          {formula}
        </p>
        {description && (
          <p className="text-xs text-slate-500 text-center mt-1">
            {description}
          </p>
        )}
      </div>

      {/* Eingabefelder */}
      <div
        className={`grid gap-4 grid-cols-1 md:grid-cols-${Math.min(
          fields.length,
          3
        )}`}
      >
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">
              {field.label}
            </Label>
            <Input
              type="number"
              value={values[field.name] || ""}
              onChange={(e) =>
                setValues({
                  ...values,
                  [field.name]: e.target.value,
                })
              }
              placeholder={field.placeholder}
              step={field.step || "0.01"}
              className="text-lg h-12 border-2 border-slate-200"
            />
          </div>
        ))}
      </div>

      {/* Ergebnis */}
      {result !== null && (
        <div className="p-6 bg-[#004998]/10 rounded-lg border-2 border-[#004998]">
          <h3 className="font-semibold text-[#004998] text-center mb-3">
            {resultLabel}
          </h3>
          <div className="text-center">
            <span className="text-4xl font-bold text-[#004998]">
              {result.toFixed(2)}
            </span>
            <span className="text-xl text-slate-600 ml-2">
              {resultUnit}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
