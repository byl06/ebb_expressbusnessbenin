import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/nav'
import { Logo } from './Logo'
import { Button } from './Button'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const link = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-[15px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-gold after:transition-transform ${
      isActive ? 'text-navy after:scale-x-100' : 'text-ink/75 hover:text-navy after:scale-x-0 hover:after:scale-x-100'
    }`

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white transition-shadow duration-300 ${
        scrolled ? 'border-navy/10 shadow-soft' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-page items-center justify-between px-5 sm:px-8">
        <Link to="/" aria-label="Express Business Bénin – accueil" className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy">
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={link}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button to="/contact" variant="navy" className="hidden !min-h-[44px] !px-5 lg:inline-flex">
            Nous contacter
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-navy/15 text-navy lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-mobile" className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-white lg:hidden">
          <nav aria-label="Navigation mobile" className="mx-auto flex max-w-page flex-col px-5 pb-10 pt-4">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `border-b border-navy/10 py-4 font-display text-2xl font-bold ${isActive ? 'text-navy' : 'text-navy/70'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button to="/contact" variant="gold" arrow className="mt-8">
              Nous contacter
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
