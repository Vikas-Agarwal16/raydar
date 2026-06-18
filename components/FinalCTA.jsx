export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.08] px-6 py-28">
      <div className="absolute inset-0 bg-[radial-gradient(#E8447A20_1px,transparent_1px)] [background-size:60px_60px] opacity-40" />
      
      <div className="mx-auto max-w-2xl text-center relative">
        <h2 className="font-display text-5xl md:text-6xl tracking-tighter leading-none text-white">
          Set it up once.<br />Never refresh again.
        </h2>
        <p className="mt-6 text-lg text-white/60">
          Three questions, two minutes, and Raydar takes the watching off your plate for good.
        </p>

        <a
          href="/signup"
          className="mt-10 inline-block rounded-full bg-[#E8447A] px-12 py-4 text-lg font-semibold text-white shadow-2xl shadow-[#E8447A]/50 hover:bg-white hover:text-black transition-all active:scale-95"
        >
          Start monitoring — free
        </a>

        <p className="mt-6 text-sm text-white/40">No credit card. No spam. Just what matters.</p>
      </div>
    </section>
  );
}