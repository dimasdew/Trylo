import type { Metadata } from "next";
import ForgotContent from "./ForgotContent";

export const metadata: Metadata = {
  title: "Forgot Password — Trylo",
  description: "Reset your Trylo account password.",
};

export default function ForgotPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-base">
      <ForgotContent />
    </main>
  );
}
