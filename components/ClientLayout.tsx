"use client";

import { LocaleProvider } from "@/context/LocaleContext";
import { TransitionProvider } from "@/context/TransitionContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <TransitionProvider>
        {children}
      </TransitionProvider>
    </LocaleProvider>
  );
}
