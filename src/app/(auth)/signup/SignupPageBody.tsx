"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import SignupForm from "./SignupForm";
import { useT } from "@/lib/i18n";

export default function SignupPageBody() {
  const t = useT();
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        {/* LEFT — visual */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-lylac-100 via-lylac-50 to-surface p-12 flex-col justify-between">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute -top-20 -right-20 w-80 h-80 orb-p opacity-25 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 orb-v opacity-20 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-p-400/30 to-transparent" />

          <Link href="/" className="relative flex items-center gap-2.5 text-hi z-10">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lylac-600">
              <Icon name="sim" className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Trylo</span>
          </Link>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-hi text-balance leading-tight">
              {t("authp.start1")}<br />
              <span className="text-gradient-pink">{t("authp.start2")}</span>
            </h2>
            <p className="mt-4 text-mid max-w-md leading-relaxed">
              {t("authp.signupBlurb")}
            </p>
            <ul className="mt-6 space-y-3">
              {[
                t("authp.perk1"),
                t("authp.perk2"),
                t("authp.perk3"),
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-mid">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lylac-100 border border-lylac-200 shrink-0">
                    <Icon name="check" className="h-3 w-3 text-lylac-600" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="relative text-xs text-lo z-10">{t("authp.copyright")}</p>
        </div>

        {/* RIGHT — form */}
        <div className="flex flex-1 items-center justify-center p-6 sm:p-12 bg-base">
          <div className="w-full max-w-sm">
            <Link href="/" className="lg:hidden flex items-center gap-2.5 mb-8">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lylac-600">
                <Icon name="sim" className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-hi">Trylo</span>
            </Link>
            <h1 className="text-2xl font-bold text-hi mb-1">{t("authp.signupHeading")}</h1>
            <p className="text-sm text-mid mb-8">
              {t("authp.haveAccountQ")}{" "}
              <Link href="/login" className="text-lylac-600 font-medium hover:text-lylac-700 transition-colors">
                {t("authp.loginHere")}
              </Link>
            </p>
            <SignupForm />
          </div>
        </div>
      </div>
    </main>
  );
}
