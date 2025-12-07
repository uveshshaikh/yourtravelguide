import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";

type Mode = "domestic" | "international";

type StepContent = {
  instructions: string[];
  show: string[];
  staffMayAsk: string[];
  confidenceTip: string;
  checklist?: string[];
  linkHref?: string;
  linkLabel?: string;
};

type JourneyStep = {
  id: string;
  emoji: string;
  title: string;
  supportiveMessage: string;
  base: StepContent;
  domestic?: Partial<StepContent>;
  international?: Partial<StepContent>;
};

const mergeContent = (base: StepContent, overrides?: Partial<StepContent>): StepContent => ({
  instructions: overrides?.instructions ?? base.instructions,
  show: overrides?.show ?? base.show,
  staffMayAsk: overrides?.staffMayAsk ?? base.staffMayAsk,
  confidenceTip: overrides?.confidenceTip ?? base.confidenceTip,
  checklist: overrides?.checklist ?? base.checklist,
  linkHref: overrides?.linkHref ?? base.linkHref,
  linkLabel: overrides?.linkLabel ?? base.linkLabel,
});

const steps: JourneyStep[] = [
  {
    id: "home",
    emoji: "🏠",
    title: "Before leaving home",
    supportiveMessage: "Deep breath. Pack slow, sip water, and leave with extra time—you're already ahead!",
    base: {
      instructions: [
        "Keep your government ID and ticket/QR in an easy-to-reach pouch.",
        "Check flight status once more and confirm cab or ride options.",
        "Tag your bags with your name and phone number.",
      ],
      show: ["Any valid photo ID", "Boarding pass email/app"],
      staffMayAsk: ["Where are you flying today?", "Do you have any heavy or fragile bags?"],
      confidenceTip: "Take a quick photo of each bag before you leave—it helps if something looks similar on the belt.",
      checklist: [
        "Keep originals + soft copies of IDs",
        "Reach airport 2-3 hours before domestic flights",
        "Carry chargers + meds in cabin bag",
      ],
    },
    international: {
      instructions: [
        "Keep passport, visa printout, and hotel details together.",
        "Fill out any arrival forms sent by your airline.",
        "Carry a hard copy of travel insurance if required.",
      ],
      show: ["Passport (6+ months valid)", "Visa / travel permit", "Printed itinerary"],
      staffMayAsk: ["How long will you stay abroad?", "Is anyone traveling with you?"],
      confidenceTip: "Store passport + documents in one zipper pouch so you can flash it confidently when asked.",
      checklist: [
        "Reach airport 3-4 hours early",
        "Keep foreign currency or card ready",
        "Carry two passport-size photos",
      ],
    },
  },
  {
    id: "entry",
    emoji: "🚪",
    title: "Airport entry",
    supportiveMessage: "Smile at the CISF guard, show your ID + ticket, and you are inside in seconds.",
    base: {
      instructions: [
        "Join the entry queue and keep your documents in hand.",
        "Show the guard your ID and boarding pass (printed or on phone).",
        "Walk through the scanner and follow signs to your airline.",
      ],
      show: ["Photo ID", "Boarding pass or airline SMS"],
      staffMayAsk: ["Which airline?", "How many bags are you carrying?"],
      confidenceTip: "Hold your phone brightness up so the QR is easy to scan—tiny hack, big difference.",
    },
    international: {
      staffMayAsk: ["Are you flying international today?", "Do you have your passport handy?"],
      confidenceTip: "Keep your passport already open to the photo page—it speeds things up and feels professional.",
    },
  },
  {
    id: "checkin",
    emoji: "🧾",
    title: "Check-in counter",
    supportiveMessage: "You made it! Friendly airline staff will guide you through the rest.",
    base: {
      instructions: [
        "Queue up under your airline’s logo or use a kiosk if available.",
        "Share your booking reference or show the QR.",
        "Collect your printed boarding pass if you need one.",
      ],
      show: ["Photo ID", "Booking reference or PNR"],
      staffMayAsk: ["Window or aisle?", "Any bags to check in?"],
      confidenceTip: "Place your cabin bag on the floor and stand relaxed—staff can tell when you're calm and ready.",
      checklist: [
        "Weigh bags if unsure",
        "Mention fragile items",
        "Ask for seats together if traveling in a group",
      ],
    },
    international: {
      instructions: [
        "Confirm visa/immigration documents before handing over your passport.",
        "Ask staff where immigration counters are after security.",
      ],
      show: ["Passport + visa", "Return/onward ticket"],
      staffMayAsk: ["Where are you staying?", "Any liquids or electronics inside checked bags?"],
      confidenceTip: "Keep a pen handy for any declaration forms—they often hand them out here.",
    },
  },
  {
    id: "baggage",
    emoji: "🧳",
    title: "Baggage drop",
    supportiveMessage: "Pop your suitcase on the belt, watch the weight, and you’re done!",
    base: {
      instructions: [
        "Lift your suitcase onto the weighing belt when called.",
        "Answer any questions about lithium batteries or fragile pieces.",
        "Collect the baggage tag sticker—keep it safe until you land.",
      ],
      show: ["Boarding pass", "Bag tag once printed"],
      staffMayAsk: ["Did you pack this yourself?", "Any power banks inside?"],
      confidenceTip: "Stick the baggage receipt on your passport cover so it never gets lost.",
      checklist: ["Remove old tags", "Lock the bag", "Carry valuables in cabin"],
      linkHref: "/rules/baggage-weight-size-limits",
      linkLabel: "Check baggage weight guide",
    },
  },
  {
    id: "security",
    emoji: "🛡️",
    title: "Security check",
    supportiveMessage: "This is the busiest zone but also the friendliest. Officers guide travelers all day long.",
    base: {
      instructions: [
        "Place laptop, power bank, and liquids in separate trays.",
        "Empty pockets into the tray and walk through the scanner when asked.",
        "Collect everything calmly—no rush!",
      ],
      show: ["Boarding pass", "ID if asked"],
      staffMayAsk: ["Any liquids?", "Is this your laptop?"],
      confidenceTip: "Stack trays neatly and breathe—you’re doing exactly what every flyer does.",
      checklist: [
        "Remove laptop & power bank",
        "Liquids under 100 ml in a clear pouch",
        "Keep belt/watch handy to remove if asked",
      ],
      linkHref: "/rules/liquids-over-100ml",
      linkLabel: "View items allowed in cabin",
    },
    international: {
      instructions: [
        "Finish security, then follow signs to Immigration for passport stamping.",
        "Have departure card or arrival card ready if provided.",
      ],
      staffMayAsk: ["Any electronics inside this bag?", "Where will you stay tonight?"],
      confidenceTip: "Immigration sounds serious but officers simply match your face to the passport—smile and answer honestly.",
    },
  },
  {
    id: "gate",
    emoji: "🚶‍♀️",
    title: "Finding your gate",
    supportiveMessage: "Gate numbers shine on the big screens—follow them like treasure maps!",
    base: {
      instructions: [
        "Check the departure screens (“FIDS”) for your gate and boarding time.",
        "Follow overhead signs or ask any airport helper.",
        "Use restrooms, refill water, and charge your phone near the gate.",
      ],
      show: ["Boarding pass for gate access"],
      staffMayAsk: ["Need help with directions?", "Would you like assistance boarding?"],
      confidenceTip: "Set a timer for boarding time +10 minutes so you’re always early, never rushed.",
      checklist: ["Keep phone on loud for airline alerts", "Note nearby snacks", "Boarding pass tucked in front pocket"],
    },
    international: {
      instructions: [
        "After immigration, follow the duty-free corridor to your gate—everything is clearly numbered.",
        "Some gates re-check passports—keep them handy.",
      ],
      show: ["Passport + boarding pass"],
      confidenceTip: "If you’re unsure, show your boarding pass to any shop staff—they’ll point you in the right direction with a smile.",
    },
  },
  {
    id: "boarding",
    emoji: "🛫",
    title: "Boarding the aircraft",
    supportiveMessage: "Final stretch! Crew members will greet you with a smile—smile right back. 😊",
    base: {
      instructions: [
        "Queue when your zone/row is called.",
        "Scan your boarding pass at the gate or show it to the agent.",
        "Follow the aerobridge or shuttle bus to the plane.",
      ],
      show: ["Boarding pass QR", "ID if asked"],
      staffMayAsk: ["Any cabin bag to tag?", "Do you need help finding your seat?"],
      confidenceTip: "Keep earphones off for a minute—you can hear seat directions clearly and settle faster.",
      checklist: ["Keep jacket and small pouch handy", "Stow heavier bag overhead", "Seatbelt on once seated"],
    },
    international: {
      instructions: [
        "Gate agents may check passport + visa again—hand them over with a confident smile.",
        "Once on board, fill out arrival forms if the crew hands them out.",
      ],
      show: ["Passport", "Boarding pass"],
      confidenceTip: "Say a cheerful hello to the crew—they remember friendly faces and gladly help later.",
    },
  },
];

const FirstFlightGuide = () => {
  const [mode, setMode] = useState<Mode>("domestic");
  const [currentStep, setCurrentStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selected = scrollRef.current?.querySelector<HTMLDivElement>(`[data-step-index='${currentStep}']`);
    selected?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [currentStep]);

  const handleModeChange = (value: Mode) => {
    setMode(value);
    setCurrentStep(0);
  };

  const getContent = (step: JourneyStep) =>
    mergeContent(step.base, mode === "international" ? step.international : step.domestic);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleAudioPreview = () => {
    if (typeof window === "undefined") return;
    const AudioContextCtor =
      window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) {
      return;
    }
    const audioCtx = new AudioContextCtor();
    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 660;
    gain.gain.value = 0.1;
    oscillator.connect(gain).connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.25);
  };

  const renderStepCard = (step: JourneyStep, idx: number, extraClasses = "") => {
    const content = getContent(step);
    const isActive = idx === currentStep;
    return (
      <article
        key={`${step.id}-${extraClasses || idx}`}
        data-step-index={idx}
        className={`bg-white rounded-[32px] border border-slate-200 shadow-[0_30px_80px_-60px_rgba(30,64,175,0.5)] p-6 sm:p-8 transition-transform ${
          isActive ? "md:scale-[1.01]" : "md:opacity-80"
        } ${extraClasses}`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl" aria-hidden>
              {step.emoji}
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{step.title}</h2>
          </div>
          <button
            type="button"
            onClick={handleAudioPreview}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-sm text-slate-600 hover:border-blue-300 w-full sm:w-auto justify-center"
          >
            🎧 Listen to this step
          </button>
        </div>
        <p className="text-slate-600 mb-4">{step.supportiveMessage}</p>

        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Simple instructions</h3>
            <ul className="space-y-1.5 text-slate-700">
              {content.instructions.map((line, lineIdx) => (
                <li key={lineIdx}>• {line}</li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <h4 className="text-sm font-semibold text-slate-500 uppercase mb-2">What to show</h4>
              <ul className="text-slate-700 space-y-1 text-sm">
                {content.show.map((item, itemIdx) => (
                  <li key={itemIdx}>✅ {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <h4 className="text-sm font-semibold text-slate-500 uppercase mb-2">Staff may ask</h4>
              <ul className="text-slate-700 space-y-1 text-sm">
                {content.staffMayAsk.map((item, itemIdx) => (
                  <li key={itemIdx}>💬 {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {content.checklist && (
            <div>
              <h4 className="text-sm font-semibold text-slate-500 uppercase mb-2">Mini checklist</h4>
              <ul className="space-y-1 text-slate-700 text-sm">
                {content.checklist.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center gap-2">
                    <span className="text-green-500">☑️</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {content.linkHref && content.linkLabel && (
            <Link
              href={content.linkHref}
              className="inline-flex items-center text-sm font-semibold text-blue-600"
            >
              {content.linkLabel}
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          )}

          <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-2xl p-4 text-slate-700">
            <p className="text-sm font-semibold text-green-700 mb-1">Confidence tip 💡</p>
            <p>{content.confidenceTip}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={currentStep === 0}
            className="px-4 py-2 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 disabled:opacity-40"
          >
            ← Previous
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-500"
            >
              Next step →
            </button>
          ) : (
            <div className="text-slate-600 text-sm font-semibold">You’re ready to board. Have a joyful flight! 🎉</div>
          )}
        </div>
      </article>
    );
  };

  return (
    <Layout title="First Flight Journey | YourTravelGuide" description="Step-by-step calm guide for every first-time flyer in India.">
      <div className="bg-gradient-to-b from-blue-600 via-blue-500 to-sky-400 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="uppercase text-sm tracking-[0.3em] text-white/80 mb-3">First Flight Coach</p>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4">Your calm journey from home to take-off ✈️</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Seven gentle steps, friendly tips, and zero stress. Toggle between domestic and international travel whenever you need.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="inline-flex rounded-full bg-slate-100 p-1 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleModeChange("domestic")}
              className={`flex-1 sm:flex-none px-4 py-2 text-sm font-semibold rounded-full transition ${
                mode === "domestic" ? "bg-white shadow text-blue-600" : "text-slate-500"
              }`}
            >
              🇮🇳 Domestic flyer
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("international")}
              className={`flex-1 sm:flex-none px-4 py-2 text-sm font-semibold rounded-full transition ${
                mode === "international" ? "bg-white shadow text-purple-600" : "text-slate-500"
              }`}
            >
              🌍 International flyer
            </button>
          </div>
          <p className="text-sm text-slate-500">
            Mode switched? We reset to Step 1 so you never miss any detail.
          </p>
        </div>

        <div className="flex items-center gap-2 justify-center mb-6 flex-wrap">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              type="button"
              onClick={() => setCurrentStep(idx)}
              className={`w-9 h-9 rounded-full font-semibold transition border ${
                idx === currentStep
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                  : "bg-white text-slate-500 border-slate-200 hover:border-blue-300"
              }`}
              aria-label={`Go to step ${idx + 1}: ${step.title}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <div className="text-center text-sm text-slate-500 mb-4">
          Step {currentStep + 1} of {steps.length} · {steps[currentStep].title}
        </div>

        <div className="md:hidden mb-6">
          {renderStepCard(steps[currentStep], currentStep, "w-full")}
        </div>
        <div
          ref={scrollRef}
          className="hidden md:flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {steps.map((step, idx) =>
            renderStepCard(
              step,
              idx,
              "snap-center min-w-[calc(100%-2rem)] sm:min-w-[520px] lg:min-w-[620px] flex-shrink-0"
            )
          )}
        </div>

        <div className="mt-10 text-center bg-slate-50 border border-slate-200 rounded-3xl p-6 text-slate-600">
          <p className="text-base font-semibold text-slate-900 mb-1">Need more reassurance?</p>
          <p className="mb-3">Browse our detailed rules on baggage, liquids, first-time IDs, and more.</p>
          <BackButton
            label="Back to main rules"
            className="px-5 py-2 rounded-full bg-white border border-slate-200 text-sm font-semibold text-blue-600"
          />
        </div>
      </div>
    </Layout>
  );
};

export default FirstFlightGuide;

