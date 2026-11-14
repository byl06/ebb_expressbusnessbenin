import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

type Variant = 'gold' | 'navy' | 'outline' | 'outlineLight' | 'ghost'

const styles: Record<Variant, string> = {
  gold: 'bg-gold text-navy hover:bg-[#d4b57b] focus-visible:outline-gold',
  navy: 'bg-navy text-white hover:bg-navy-800 focus-visible:outline-navy',
  outline: 'border border-navy/25 text-navy hover:border-navy hover:bg-navy/5 focus-visible:outline-navy',
  outlineLight: 'border border-white/35 text-white hover:border-white hover:bg-white/10 focus-visible:outline-white',
  ghost: 'text-navy-800 hover:text-navy focus-visible:outline-navy',
}

interface Props {
  children: ReactNode
  variant?: Variant
  arrow?: boolean
  className?: string
  to?: string
  href?: string
  external?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function Button({
  children, variant = 'gold', arrow, className = '', to, href, external, onClick, type = 'button', disabled,
}: Props) {
  const cls = `group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md px-6 py-3 text-[15px] font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`
  const content = (
    <>
      {children}
      {arrow && <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />}
    </>
  )
  if (to) return <Link to={to} className={cls}>{content}</Link>
  if (href)
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {content}
      </a>
    )
  return <button type={type} onClick={onClick} disabled={disabled} className={cls}>{content}</button>
}
