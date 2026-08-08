import type { Metadata } from "next";
import HelpBody from "./HelpBody";

export const metadata: Metadata = {
  title: "Help — Trylo",
  description: "Trylo help center. FAQ, eSIM activation guides, and 24/7 support contact.",
};

export default function HelpPage() {
  return <HelpBody />;
}
