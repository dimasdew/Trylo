import Link from "next/link";
import Icon from "./Icon";

const links = {
  Produk: [
    { href: "/#destinations", label: "Destinasi" },
    { href: "/#regional", label: "Paket Regional" },
    { href: "/#how", label: "Cara Kerja" },
  ],
  Perusahaan: [
    { href: "/#about", label: "Tentang" },
    { href: "/#testimonials", label: "Testimoni" },
    { href: "/login", label: "Masuk" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lylac-600">
                <Icon name="sim" className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-hi">Trylo</span>
            </Link>
            <p className="text-sm text-lo leading-relaxed">
              eSIM global untuk traveler modern. Internet di mana pun, tanpa kartu fisik.
            </p>
            <div className="flex gap-2">
              {["twitter", "instagram", "mail"].map((s) => (
                <div
                  key={s}
                  className="flex h-8 w-8 items-center justify-center rounded-lg glass-light hover:border-border-bright transition cursor-pointer"
                >
                  <Icon name={s === "twitter" ? "globe" : s === "instagram" ? "heart" : "mail"} className="h-3.5 w-3.5 text-mid" />
                </div>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold text-lo uppercase tracking-widest mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-mid hover:text-hi transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-lo uppercase tracking-widest mb-4">
              Bantuan
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-mid">
                <Icon name="chat" className="h-3.5 w-3.5 text-lylac-600" />
                Support 24/7
              </li>
              <li className="flex items-center gap-2 text-sm text-mid">
                <Icon name="mail" className="h-3.5 w-3.5 text-lylac-600" />
                help@trylo.id
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-lo">© 2026 Trylo. All rights reserved.</p>
          <p className="text-xs text-lo flex items-center gap-1">
            Made with <Icon name="heart" className="inline h-3 w-3 text-lylac-500" /> in Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
