import React, { useMemo, useState } from "react";

const formatNumber = (value: number) => `${value.toFixed(0)} cm`;

const MiniTools: React.FC = () => {
  const [bagType, setBagType] = useState<"cabin" | "checked">("cabin");
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const baggageMessage = useMemo(() => {
    if (!length || !width || !height) {
      return "Enter L, W, H to check against airline allowances.";
    }

    if (bagType === "cabin") {
      const withinEach = length <= 55 && width <= 35 && height <= 25;
      const withinSum = length + width + height <= 115;
      if (withinEach && withinSum) {
        return "✅ Fits most Indian cabin bag sizers (55 × 35 × 25 cm / 115 cm sum).";
      }
      return "⚠️ Too large for standard cabin limits — move it to checked baggage.";
    }

    const total = length + width + height;
    if (total <= 158) {
      return "✅ Within the 158 cm checked baggage sum used by IndiGo, Air India, Vistara, Akasa.";
    }
    return "⚠️ Oversize bag — expect excess or oversize fees at the counter.";
  }, [bagType, length, width, height]);

  const [liquidInput, setLiquidInput] = useState("100, 50, 30");
  const liquidResult = useMemo(() => {
    const values = liquidInput
      .split(/[,\n]/)
      .map((token) => parseFloat(token.trim()))
      .filter((num) => !Number.isNaN(num) && num > 0);

    if (values.length === 0) {
      return { total: 0, message: "Enter volumes in ml separated by commas." };
    }

    const total = values.reduce((sum, val) => sum + val, 0);
    if (total <= 1000) {
      return {
        total,
        message: "✅ Within the 1L (1000 ml) liquids bag limit.",
      };
    }
    return {
      total,
      message: "⚠️ Over 1L — move some bottles to checked baggage.",
    };
  }, [liquidInput]);

  const medicationItems = [
    { id: "rx", label: "Prescription or doctor letter" },
    { id: "packs", label: "Original blister packs" },
    { id: "cooling", label: "Cooling pouch / gel pack" },
    { id: "airline", label: "Airline pre-approval (if injections)" },
    { id: "spares", label: "72-hr spare supply" },
  ];
  const [medChecklist, setMedChecklist] = useState<Record<string, boolean>>({});
  const medsReady = medicationItems.every((item) => medChecklist[item.id]);

  const [passportDate, setPassportDate] = useState("");
  const passportMessage = useMemo(() => {
    if (!passportDate) {
      return "Enter your passport expiry date.";
    }
    const today = new Date();
    const expiry = new Date(passportDate);
    if (Number.isNaN(expiry.getTime())) {
      return "Invalid date. Use the format YYYY-MM-DD.";
    }
    const diffMs = expiry.getTime() - today.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      return "⚠️ Passport already expired — renew immediately.";
    }
    if (diffDays < 180) {
      return "⚠️ Less than 6 months validity. Renew before booking international tickets.";
    }
    return "✅ Safe to travel internationally (6+ months validity).";
  }, [passportDate]);

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Mini Tools for TravelEase</h2>
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">Beta</span>
      </div>
      <p className="text-sm text-slate-600 mb-6">
        Quick calculators travelers ask for on WhatsApp. Share them freely and ship feedback to improve the next release.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-900 mb-2">Baggage Dimension Check</h3>
          <p className="text-xs text-slate-500 mb-3">Compare your bag against standard cabin (55×35×25 cm) or checked (158 cm) limits.</p>
          <div className="flex gap-2 mb-3 text-xs font-semibold">
            <button
              className={`flex-1 rounded-full border px-3 py-1 ${bagType === "cabin" ? "bg-blue-600 text-white border-blue-600" : "text-slate-600 border-slate-300"}`}
              onClick={() => setBagType("cabin")}
            >
              Cabin bag
            </button>
            <button
              className={`flex-1 rounded-full border px-3 py-1 ${bagType === "checked" ? "bg-blue-600 text-white border-blue-600" : "text-slate-600 border-slate-300"}`}
              onClick={() => setBagType("checked")}
            >
              Checked bag
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <label className="flex flex-col gap-1 text-slate-700">
              L
              <input
                type="number"
                min="0"
                className="rounded border border-slate-300 px-2 py-1"
                onChange={(e) => setLength(Number(e.target.value))}
                placeholder="cm"
              />
            </label>
            <label className="flex flex-col gap-1 text-slate-700">
              W
              <input
                type="number"
                min="0"
                className="rounded border border-slate-300 px-2 py-1"
                onChange={(e) => setWidth(Number(e.target.value))}
                placeholder="cm"
              />
            </label>
            <label className="flex flex-col gap-1 text-slate-700">
              H
              <input
                type="number"
                min="0"
                className="rounded border border-slate-300 px-2 py-1"
                onChange={(e) => setHeight(Number(e.target.value))}
                placeholder="cm"
              />
            </label>
          </div>
          <p className="mt-3 text-sm font-medium text-slate-800">{baggageMessage}</p>
          {length + width + height > 0 && (
            <p className="text-xs text-slate-500 mt-1">
              Total: {formatNumber(length)} + {formatNumber(width)} + {formatNumber(height)} = {(length + width + height).toFixed(0)} cm
            </p>
          )}
        </div>

        <div className="border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-900 mb-2">Liquid 100ml Calculator</h3>
          <p className="text-xs text-slate-500 mb-3">Enter bottle sizes in ml, separated by commas or new lines.</p>
          <textarea
            className="w-full rounded border border-slate-300 px-2 py-2 text-sm mb-2"
            rows={4}
            value={liquidInput}
            onChange={(e) => setLiquidInput(e.target.value)}
          />
          <p className="text-sm font-medium text-slate-800">{liquidResult.message}</p>
          <p className="text-xs text-slate-500">Total: {liquidResult.total} ml / 1000 ml</p>
        </div>

        <div className="border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-900 mb-2">Medication Checklist</h3>
          <p className="text-xs text-slate-500 mb-3">Tick must-haves before packing medicines or injections.</p>
          <ul className="space-y-2 text-sm">
            {medicationItems.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
                <input
                  id={item.id}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded border-slate-300"
                  checked={!!medChecklist[item.id]}
                  onChange={(e) =>
                    setMedChecklist((prev) => ({
                      ...prev,
                      [item.id]: e.target.checked,
                    }))
                  }
                />
                <label htmlFor={item.id} className="text-slate-700 cursor-pointer">
                  {item.label}
                </label>
              </li>
            ))}
          </ul>
          <p className={`mt-3 text-sm font-semibold ${medsReady ? "text-green-700" : "text-amber-700"}`}>
            {medsReady ? "✅ Ready to fly. Carry them in cabin with doctor letter." : "⚠️ Complete every item to avoid security delays."}
          </p>
        </div>

        <div className="border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-900 mb-2">Passport Validity Checker</h3>
          <p className="text-xs text-slate-500 mb-3">Most countries need 6+ months validity from the date you land.</p>
          <input
            type="date"
            className="w-full rounded border border-slate-300 px-2 py-2 text-sm mb-3"
            value={passportDate}
            onChange={(e) => setPassportDate(e.target.value)}
          />
          <p className="text-sm font-medium text-slate-800">{passportMessage}</p>
        </div>
      </div>
    </section>
  );
};

export default MiniTools;
