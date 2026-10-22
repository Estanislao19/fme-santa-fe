"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/site";
// La navegación completa permanece en el footer; el primer nivel se concentra en cuatro entradas.
const primaryNavigation = navigation.filter(([, href]) =>
  ["/nosotras", "/socias", "/capacitaciones", "/alianzas"].includes(href),
);
export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const items = [
          toggle.current,
          ...Array.from(
            menu.current?.querySelectorAll<HTMLAnchorElement>("a") || [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="FME · Inicio">
          <Image
            src="/images/logo-fme.png"
            width={70}
            height={70}
            alt="Logo oficial FME"
            priority
          />
          <span>
            Fundación Mujeres
            <br />
            Emprendedoras<span className="brand-location">SANTA FE</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {primaryNavigation.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/comunidad">
          Quiero ser parte
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen(!open)}
        >
          <span>{open ? "×" : "☰"}</span>
        </button>
      </div>
      {open && (
        <div id="mobile-menu" ref={menu} className="mobile-menu">
          <nav aria-label="Navegación móvil">
            {primaryNavigation.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={path === href ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
            <Link
              className="button"
              href="/comunidad"
              onClick={() => setOpen(false)}
            >
              Quiero ser parte
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
