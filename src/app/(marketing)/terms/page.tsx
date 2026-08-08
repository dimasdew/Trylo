import type { Metadata } from "next";
import TermsBody from "./TermsBody";

export const metadata: Metadata = {
  title: "Terms & Conditions — Trylo",
  description: "Terms and conditions for using Trylo's services.",
};

export default function TermsPage() {
  return <TermsBody />;
}
