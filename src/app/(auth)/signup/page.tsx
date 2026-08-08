import type { Metadata } from "next";
import SignupPageBody from "./SignupPageBody";

export const metadata: Metadata = {
  title: "Sign up — Trylo",
  description: "Create a Trylo account to start buying global eSIMs.",
};

export default function SignupPage() {
  return <SignupPageBody />;
}
