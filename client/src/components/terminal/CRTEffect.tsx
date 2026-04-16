import { type ReactNode } from "react";

interface CRTEffectProps {
  children: ReactNode;
  poweredOn: boolean;
}

export function CRTEffect({ children, poweredOn }: CRTEffectProps) {
  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${
        poweredOn ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* CRT curvature + vignette container */}
      <div className="crt-screen relative w-full h-full">
        {/* Main content */}
        <div className="relative z-10 w-full h-full">{children}</div>

        {/* Scanlines overlay */}
        <div className="crt-scanlines pointer-events-none absolute inset-0 z-20" />

        {/* Flicker overlay */}
        <div className="crt-flicker pointer-events-none absolute inset-0 z-20" />

        {/* RGB shift on edges */}
        <div className="crt-vignette pointer-events-none absolute inset-0 z-30" />

        {/* Screen reflection */}
        <div className="crt-reflection pointer-events-none absolute inset-0 z-30" />
      </div>
    </div>
  );
}
