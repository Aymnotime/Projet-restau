import type { SVGProps } from "react";
import logoImage from "../../logo/logo.png";

type P = SVGProps<SVGSVGElement>;
const base = (props: P): P => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

/* — Icônes dessinées sur mesure pour Le Monde du Goût — */

export const IconCleaver = (p: P) => (
  <svg {...base(p)}>
    <path d="M3.5 4h11l3 3v5.5a1.5 1.5 0 0 1-1.5 1.5H7L3.5 10z" />
    <path d="M14.5 4.2 20.5 10M8 14v3.2a1.8 1.8 0 0 0 1.8 1.8h0A1.8 1.8 0 0 0 11.6 17V14" />
    <circle cx="7.5" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const IconSauce = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3.5c2.6 3.2 4.5 5.6 4.5 8.3a4.5 4.5 0 0 1-9 0c0-2.7 1.9-5.1 4.5-8.3z" />
    <path d="M9.8 12.2a2.3 2.3 0 0 0 2 2.4" />
    <path d="M5 20.5h14" />
  </svg>
);

export const IconFries = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 10 5.2 4.8M12 9.5V3.5M17 10l1.8-5.2M9.5 10 8.6 5.6M14.5 10l.9-4.4" />
    <path d="M6 10h12l-1.4 9.2a1.5 1.5 0 0 1-1.5 1.3H8.9a1.5 1.5 0 0 1-1.5-1.3z" />
    <path d="M8.5 14.5h7" />
  </svg>
);

export const IconStack = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 8.5C4 6 7.6 4.5 12 4.5s8 1.5 8 4z" />
    <path d="M4 11.5h16M5.5 14.5h13M4 17.5c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5" />
  </svg>
);

export const IconScooter = (p: P) => (
  <svg {...base(p)}>
    <circle cx="6" cy="17.5" r="2.5" />
    <circle cx="18.5" cy="17.5" r="2.5" />
    <path d="M6 17.5h6.2l2.3-7h3l1 4.5" />
    <path d="M13.5 6.5h2.2l.8 4" />
    <path d="M3.5 13.5 6 12h4" />
  </svg>
);

export const IconBag = (p: P) => (
  <svg {...base(p)}>
    <path d="M5.5 8h13l-1 11a1.8 1.8 0 0 1-1.8 1.5H8.3A1.8 1.8 0 0 1 6.5 19z" />
    <path d="M9 10.5V6.8a3 3 0 0 1 6 0v3.7" />
  </svg>
);

export const IconPhone = (p: P) => (
  <svg {...base(p)}>
    <path d="M5.5 4h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L16 14l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 6.2 2 2 0 0 1 5.5 4z" />
  </svg>
);

export const IconPin = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s-6.5-5.6-6.5-10.3A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.7C18.5 15.4 12 21 12 21z" />
    <circle cx="12" cy="10.5" r="2.2" />
  </svg>
);

export const IconClock = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconMail = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4.5 7.5 7.5 6 7.5-6" />
  </svg>
);

export const IconArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12h15M13.5 5.5 20 12l-6.5 6.5" />
  </svg>
);

export const IconArrowDown = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 4v15M5.5 13.5 12 20l6.5-6.5" />
  </svg>
);

export const IconCompass = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m15.5 8.5-2.2 5-5 2.2 2.2-5z" />
  </svg>
);

export const IconGlobe = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c-3 2.6-3 14.4 0 17M12 3.5c3 2.6 3 14.4 0 17" />
  </svg>
);

export const IconFlame = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3.5c1 2.8 4.5 4.7 4.5 8.6a4.5 4.5 0 0 1-9 0c0-1.6.6-2.9 1.5-4.1.3 1 .9 1.7 1.8 2.1C10.4 7.6 10.9 5.3 12 3.5z" />
    <path d="M7 20.5h10" />
  </svg>
);

export const IconClose = (p: P) => (
  <svg {...base(p)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconMenu = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const IconPlane = (p: P) => (
  <svg {...base(p)}>
    <path d="M20.5 4.5 3.5 11l6 2.5L12 20l3-6.5z" />
    <path d="m20.5 4.5-11 9" />
  </svg>
);

/* — Logo — */
export function LogoMark({ className = "" }: { className?: string }) {
  return <img src={logoImage} className={className} alt="" aria-hidden="true" />;
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark className={compact ? "h-9 w-9" : "h-11 w-11"} />
      <span className="font-display leading-[0.85] tracking-wide">
        <span className={`block ${compact ? "text-lg" : "text-xl"}`}>LE MONDE</span>
        <span className={`block text-ember ${compact ? "text-lg" : "text-xl"}`}>DU GOÛT</span>
      </span>
    </span>
  );
}
