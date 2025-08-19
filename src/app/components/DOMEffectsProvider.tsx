"use client";

import { PropsWithChildren } from "react";
import { useFluidLoading } from "../hooks/useFluidLoading";
import { usePortfolio } from "../hooks/usePortfolio";

export default function DOMEffectsProvider({ children }: PropsWithChildren) {
  // Ensure the elements that should be targeted have a literal "section" class
  useFluidLoading({ classes: "section" });
  usePortfolio();

  return <>{children}</>;
}
