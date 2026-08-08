import type { Metadata } from "next";
import PrivacyBody from "./PrivacyBody";

export const metadata: Metadata = {
  title: "Privacy Policy — Trylo",
  description: "Trylo's data privacy policy.",
};

export default function PrivacyPage() {
  return <PrivacyBody />;
}
