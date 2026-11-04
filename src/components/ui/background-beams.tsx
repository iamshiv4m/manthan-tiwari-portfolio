"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden
    >
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px w-[40%] bg-gradient-to-r from-transparent via-accent/20 to-transparent motion-reduce:hidden"
          style={{
            top: `${15 + i * 14}%`,
            left: `${-10 + i * 5}%`,
            rotate: -12 + i * 2,
          }}
          animate={{
            x: [0, 120, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
