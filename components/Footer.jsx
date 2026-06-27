import Link from "next/link";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="px-6 py-20 bg-[#0B0C10]">
      <div className="mx-auto max-w-6xl">
        {/* Telegram Banner */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-16">
          <div>
            <p className="text-xl font-medium text-white">Get alerts on Telegram</p>
            <p className="text-white/60 mt-1">Instant setup. Instant pings. No email needed.</p>
          </div>
          <a
            href="/signup"
            className="inline-flex items-center gap-3 rounded-full bg-[#E8447A] px-8 py-3.5 font-medium text-white hover:bg-white hover:text-black transition-all whitespace-nowrap"
          >
            Connect on Telegram →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left - Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3">
              <svg width="32" height="32" viewBox="0 0 28 28" aria-hidden="true">
                <rect width="28" height="28" rx="7" fill="#E8447A" />
                <circle cx="14" cy="14" r="7.5" fill="none" stroke="#fff" strokeWidth="1.4" />
                <path d="M14 14 L14 6.5 A7.5 7.5 0 0 1 20.8 10.5 Z" fill="#fff" />
              </svg>
              <span className="font-display text-2xl font-bold tracking-tighter text-white">
                Ray<span className="text-[#E8447A]">dar</span>
              </span>
            </Link>

            <p className="mt-6 text-white/50 leading-relaxed max-w-md">
              Apna kaam btao, aur bhul jao.<br />
              Built by a student who got tired of refreshing the same 21 tabs.
            </p>
          </div>

          {/* Right Side - Links (Now better utilized) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-y-10">
            {/* Product */}
            <div>
              <p className="font-medium text-white mb-4">Product</p>
              <ul className="space-y-3 text-white/60">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it works</a></li>
                <li><a href="#sectors" className="hover:text-white transition-colors">Sectors</a></li>
                <li><a href="/signup" className="hover:text-white transition-colors">Sign up</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            {/* Sectors */}
            <div>
              <p className="font-medium text-white mb-4">Sectors</p>
              <ul className="space-y-3 text-white/60">
                <li><a href="#sectors" className="hover:text-white transition-colors">Exams</a></li>
                <li><a href="#sectors" className="hover:text-white transition-colors">Internships</a></li>
                <li><a href="#sectors" className="hover:text-white transition-colors">Hackathons</a></li>
                <li><a href="#sectors" className="hover:text-white transition-colors">Counselling</a></li>
              </ul>
            </div>

            {/* Resources + Legal */}
            <div>
              <p className="font-medium text-white mb-4">Resources</p>
              <ul className="space-y-3 text-white/60">
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="mailto:hello@raydar.in" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/[0.08] text-xs text-white/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {year} Raydar. Made in India with ❤️</p>
          <p className="text-center md:text-right">
           Not affiliated with NTA, JoSAA, Amazon, or any tracked site.
          </p>
        </div>
      </div>
    </footer>
  );
}