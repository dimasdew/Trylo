import type { Metadata } from "next";
import LoginPageBody from "./LoginPageBody";

export const metadata: Metadata = {
  title: "Sign in — Trylo",
  description: "Sign in to your Trylo account to manage your eSIMs.",
};

export default function LoginPage() {
  return <LoginPageBody />;
}
