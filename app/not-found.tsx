import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ background: "white" }}
      />
      <p className="text-zinc-600 text-xs font-bold tracking-[0.6em] uppercase mb-8 relative z-10">404</p>
      <h1
        className="text-white font-black relative z-10 leading-none mb-6 select-none"
        style={{ fontSize: "clamp(4rem,16vw,12rem)", letterSpacing: "-0.05em" }}>
        Lost.
      </h1>
      <p className="text-zinc-500 text-base mb-10 max-w-sm relative z-10 leading-relaxed">
        This page doesn&apos;t exist. But your next website might.
      </p>
      <Link
        href="/"
        className="relative z-10 bg-white text-black font-black px-10 py-4 tracking-widest uppercase text-sm hover:bg-zinc-200 transition-colors">
        Back to Portfolio
      </Link>
    </div>
  );
}
