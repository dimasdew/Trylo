"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/lib/store";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [user, router, pathname]);

  if (!user) return null;

  return <>{children}</>;
}
