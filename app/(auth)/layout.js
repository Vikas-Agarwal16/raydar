  import Link from "next/link";

  export default function AuthLayout({ children }) {
    return (
      <div className="min-h-screen bg-[#0B0C10] flex items-center justify-center px-6 py-12 relative overflow-hidden">
        {/* Subtle Radar/Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 30%, #E8447A 0.8px, transparent 1px),
                radial-gradient(circle at 75% 60%, #E8447A 0.6px, transparent 1px),
                linear-gradient(#ffffff08 1px, transparent 1px),
                linear-gradient(90deg, #ffffff08 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px, 120px 120px, 40px 40px, 40px 40px",
            }}
          />
        </div>

        {/* Top Navigation */}
        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center gap-3 z-20 group"
        >
          <div className="w-8 h-8 rounded-xl bg-[#E8447A] flex items-center justify-center">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <span className="font-display text-2xl font-semibold tracking-tighter text-white group-hover:text-[#E8447A] transition-colors">
            Ray<span className="text-[#E8447A]">dar</span>
          </span>
        </Link>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-md">
          {children}
        </div>

        {/* Bottom Branding */}
        <div className="absolute bottom-8 text-center w-full text-xs text-white/30 z-10">
          Made in India • Not affiliated with any government body
        </div>
      </div>
    );
  }