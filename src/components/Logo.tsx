export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3" aria-label="Express Business Bénin">
      <img src="/images/logo/logo-ebb.webp" width={48} height={48} alt="" className="h-12 w-12 shrink-0 rounded-full" />
      <span className="leading-none">
        <span className={`block font-display text-lg font-extrabold tracking-tight ${light ? 'text-white' : 'text-navy'}`}>EBB</span>
        <span className={`mt-1 block text-[10px] font-semibold uppercase tracking-[0.2em] ${light ? 'text-white/70' : 'text-navy-800/80'}`}>
          Express Business Bénin
        </span>
      </span>
    </span>
  )
}
