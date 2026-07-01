import Link from "next/link";
import { Send, ShieldCheck, ArrowRight } from "lucide-react";

const XIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.64 7.584H.472l8.6-9.83L0 1.153h7.594l5.243 6.932L18.901 1.153Zm-1.29 19.494h2.04L6.486 3.24H4.298l13.313 17.407Z" />
  </svg>
);

const LinkedinIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18V9.75H5.67V18h2.67zM7 8.62a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zM18.34 18v-4.45c0-2.38-1.27-3.49-2.97-3.49-1.37 0-1.98.75-2.32 1.28V9.75h-2.67V18h2.67v-4.6c0-.24.02-.49.09-.66.2-.49.65-1 1.41-1 1 0 1.4.76 1.4 1.86V18h2.39z" />
  </svg>
);

const GithubIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const year = new Date().getFullYear();

const SOCIALS = [
  { icon: Send, href: "https://t.me/raydarbot", label: "Telegram" },
  { icon: XIcon, href: "https://x.com/vikas_agarwal16", label: "X" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/vikas-agarwal16/", label: "LinkedIn" },
  { icon: GithubIcon, href: "https://github.com/Vikas-Agarwal16", label: "GitHub" },
];

const PRODUCT_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Supported Sites", href: "#sectors" },
  { label: "Sign up", href: "/signup" },
  { label: "Sign in", href: "/signin" },
];

const RESOURCE_LINKS = [
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "mailto:hello@raydar.in" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#0B0C10] px-6 pt-20 pb-10">
      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:pr-6">
            <Link href="/" className="flex items-center gap-2.5">
              <svg width="30" height="30" viewBox="0 0 28 28" aria-hidden="true">
                <rect width="28" height="28" rx="7" fill="#E8447A" />
                <circle cx="14" cy="14" r="7.5" fill="none" stroke="#fff" strokeWidth="1.4" />
                <path d="M14 14 L14 6.5 A7.5 7.5 0 0 1 20.8 10.5 Z" fill="#fff" />
              </svg>
              <span className="font-display text-xl font-bold tracking-tighter text-white">
                Ray<span className="text-[#E8447A]">dar</span>
              </span>
            </Link>

            <p className="mt-5 text-[15px] leading-relaxed text-white/50">
              We monitor opportunities so you don&apos;t have to. Real-time updates on what matters most.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ icon: SocialIcon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-white/50 transition-colors hover:border-white/20 hover:text-white"
                >
                  <SocialIcon width={15} height={15} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="mb-4 font-medium text-white">Product</p>
            <ul className="space-y-3 text-white/60">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="mb-4 font-medium text-white">Resources</p>
            <ul className="space-y-3 text-white/60">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay connected (Telegram) */}
          <div>
            <p className="mb-4 font-medium text-white">Stay in the loop</p>
            <p className="text-[15px] text-white/50">
              Instant setup. Instant pings. No email needed.
            </p>
            <a
              href="https://t.me/raydarbot"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#E8447A] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-black"
            >
              Connect on Telegram
              <ArrowRight size={15} strokeWidth={2.5} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative mt-16 flex flex-col gap-6 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <ShieldCheck size={18} className="mt-0.5 flex-shrink-0 text-[#E8447A]" strokeWidth={2} />
            <p className="text-sm text-white/50">
              Raydar keeps your data safe and private.
              <br className="hidden sm:block" />
              We never share your information.
            </p>
          </div>

          <p className="text-xs text-white/40">
            © {year} Raydar. Not affiliated with any official website or organization.
          </p>
        </div>

     
      </div>
    </footer>
  );
}