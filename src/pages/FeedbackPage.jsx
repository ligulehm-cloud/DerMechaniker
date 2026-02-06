import React, { useState } from "react";

export default function FeedbackPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const mailtoLink = `mailto:dermechaniker@ligulehm.ch?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(message)}`;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-10">
      <h1 className="text-3xl font-bold text-center text-[#004998]">📩 Feedback & Haftung</h1>

      <div className="space-y-4 text-slate-800 text-base leading-relaxed">
        <p>
          Diese App wurde mit grösstmöglicher Sorgfalt erstellt. Dennoch gilt:
        </p>

        <p className="font-semibold text-red-600">
          ⚠️ Nutzung auf eigene Verantwortung. Für Schäden durch falsche Eingaben oder Ergebnisse wird keine Haftung übernommen.
        </p>

        <p>
          Fragen, Hinweise oder Ideen? Sende uns dein Feedback direkt hier:
        </p>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailtoLink;
          }}
        >
          <div>
            <label className="block mb-1 font-medium text-slate-700">Betreff</label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded px-3 py-2"
              placeholder="z.B. Vorschlag zur Drehmomentseite"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-slate-700">Nachricht</label>
            <textarea
              className="w-full border border-slate-300 rounded px-3 py-2 h-32 resize-none"
              placeholder="Dein Feedback oder deine Idee..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#004998] hover:bg-[#003876] text-white font-semibold py-2 px-6 rounded"
          >
            ✉️ Feedback senden
          </button>
        </form>
      </div>

      <p className="text-sm text-slate-500 text-center mt-10">
        Kontakt: <a href="mailto:dermechaniker@ligulehm.ch" className="underline">dermechaniker@ligulehm.ch</a>
        <br />
        Version 1.0 · Stand: Februar 2026
      </p>
    </div>
  );
}
