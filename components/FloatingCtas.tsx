import Link from "next/link";

const FloatingCtas = () => {
  return (
    <>
      <div className="hidden lg:flex fixed top-1/2 right-6 -translate-y-1/2 flex-col gap-3 z-40">
        <Link
          href="/first-flight"
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-4 py-2 text-sm font-semibold shadow-lg hover:bg-blue-500"
        >
          😊 First-flight guide
        </Link>
        <Link
          href="/rules/airport-security-behavior-tips"
          className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-white text-amber-700 px-4 py-2 text-sm font-semibold shadow-lg hover:bg-amber-50"
        >
          ✈️ Security tips
        </Link>
      </div>
      <div className="lg:hidden fixed bottom-4 left-0 right-0 px-4 z-40">
        <div className="bg-white/95 backdrop-blur border border-slate-200 rounded-3xl shadow-xl flex items-center justify-between gap-2 px-4 py-2">
          <Link
            href="/first-flight"
            className="flex-1 inline-flex items-center justify-center gap-1 rounded-full bg-blue-600 text-white px-4 py-2 text-sm font-semibold"
          >
            😊 First flight
          </Link>
          <Link
            href="/rules/airport-security-behavior-tips"
            className="flex-1 inline-flex items-center justify-center gap-1 rounded-full border border-amber-300 text-amber-700 px-4 py-2 text-sm font-semibold"
          >
            ✈️ Security
          </Link>
        </div>
      </div>
    </>
  );
};

export default FloatingCtas;
