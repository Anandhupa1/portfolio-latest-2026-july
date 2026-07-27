"use client";

import {
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import clsx from "clsx";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function MagneticButton({
  children,
  className,
  variant = "primary",
  href,
  target,
  rel,
  type = "button",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 20 });
  const springY = useSpring(y, { stiffness: 280, damping: 20 });

  function onMove(e: MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX * 0.25);
    y.set(offsetY * 0.35);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const styles = clsx(
    "inline-flex items-center justify-center px-5 py-3 text-sm font-medium font-mono tracking-wide transition-colors",
    variant === "primary" &&
      "bg-signal text-ink hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
    variant === "ghost" &&
      "border border-lineStrong text-paper hover:bg-surface2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
    className
  );

  const shared = {
    className: styles,
    style: reduced ? undefined : { x: springX, y: springY },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        {...shared}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      {...shared}
    >
      {children}
    </motion.button>
  );
}
