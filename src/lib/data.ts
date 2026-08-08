export type Region =
  | "Asia"
  | "Eropa"
  | "Amerika Utara"
  | "Amerika Selatan"
  | "Afrika"
  | "Oseania"
  | "Timur Tengah";

export type Country = {
  id: string;
  name: string;
  code: string;
  flag: string;
  region: Region;
  popular?: boolean;
};

export type Plan = {
  id: string;
  countryId: string;
  operator: string;
  data: string;
  duration: string;
  durationDays: number;
  price: number;
  currency: string;
  features: string[];
  hotspot: boolean;
  network: string;
  bestseller?: boolean;
  bestValue?: boolean;
};

export const countries: Country[] = [
  { id: "id", name: "Indonesia", code: "ID", flag: "id", region: "Asia", popular: true },
  { id: "jp", name: "Jepang", code: "JP", flag: "jp", region: "Asia", popular: true },
  { id: "kr", name: "Korea Selatan", code: "KR", flag: "kr", region: "Asia", popular: true },
  { id: "sg", name: "Singapura", code: "SG", flag: "sg", region: "Asia", popular: true },
  { id: "th", name: "Thailand", code: "TH", flag: "th", region: "Asia", popular: true },
  { id: "vn", name: "Vietnam", code: "VN", flag: "vn", region: "Asia" },
  { id: "my", name: "Malaysia", code: "MY", flag: "my", region: "Asia" },
  { id: "ph", name: "Filipina", code: "PH", flag: "ph", region: "Asia" },
  { id: "in", name: "India", code: "IN", flag: "in", region: "Asia" },
  { id: "hk", name: "Hong Kong", code: "HK", flag: "hk", region: "Asia" },
  { id: "tw", name: "Taiwan", code: "TW", flag: "tw", region: "Asia" },
  { id: "cn", name: "Cina", code: "CN", flag: "cn", region: "Asia" },
  { id: "us", name: "Amerika Serikat", code: "US", flag: "us", region: "Amerika Utara", popular: true },
  { id: "ca", name: "Kanada", code: "CA", flag: "ca", region: "Amerika Utara" },
  { id: "uk", name: "Inggris", code: "GB", flag: "gb", region: "Eropa", popular: true },
  { id: "fr", name: "Prancis", code: "FR", flag: "fr", region: "Eropa", popular: true },
  { id: "de", name: "Jerman", code: "DE", flag: "de", region: "Eropa", popular: true },
  { id: "it", name: "Italia", code: "IT", flag: "it", region: "Eropa" },
  { id: "es", name: "Spanyol", code: "ES", flag: "es", region: "Eropa" },
  { id: "nl", name: "Belanda", code: "NL", flag: "nl", region: "Eropa" },
  { id: "ch", name: "Swiss", code: "CH", flag: "ch", region: "Eropa" },
  { id: "tr", name: "Turki", code: "TR", flag: "tr", region: "Eropa", popular: true },
  { id: "au", name: "Australia", code: "AU", flag: "au", region: "Oseania", popular: true },
  { id: "nz", name: "Selandia Baru", code: "NZ", flag: "nz", region: "Oseania" },
  { id: "ae", name: "Uni Emirat Arab", code: "AE", flag: "ae", region: "Timur Tengah", popular: true },
  { id: "sa", name: "Arab Saudi", code: "SA", flag: "sa", region: "Timur Tengah" },
  { id: "qa", name: "Qatar", code: "QA", flag: "qa", region: "Timur Tengah" },
  { id: "br", name: "Brasil", code: "BR", flag: "br", region: "Amerika Selatan" },
  { id: "mx", name: "Meksiko", code: "MX", flag: "mx", region: "Amerika Selatan" },
  { id: "za", name: "Afrika Selatan", code: "ZA", flag: "za", region: "Afrika" },
  { id: "eg", name: "Mesir", code: "EG", flag: "eg", region: "Afrika" },
];

export const regionalPlans: Plan[] = [
  {
    id: "asia-5gb-7d",
    countryId: "asia",
    operator: "Trylo Asia",
    data: "5 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 89000,
    currency: "IDR",
    features: ["12 negara Asia", "Hotspot sharing", "4G/5G auto-connect"],
    hotspot: true,
    network: "4G/5G",
    bestseller: true,
  },
  {
    id: "asia-10gb-15d",
    countryId: "asia",
    operator: "Trylo Asia",
    data: "10 GB",
    duration: "15 hari",
    durationDays: 15,
    price: 145000,
    currency: "IDR",
    features: ["12 negara Asia", "Hotspot sharing", "Unlimited WhatsApp"],
    hotspot: true,
    network: "4G/5G",
    bestValue: true,
  },
  {
    id: "eropa-5gb-7d",
    countryId: "eropa",
    operator: "Trylo Europe",
    data: "5 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 119000,
    currency: "IDR",
    features: ["30 negara Eropa", "Roaming bebas biaya", "4G/5G"],
    hotspot: true,
    network: "4G/5G",
    bestseller: true,
  },
  {
    id: "eropa-15gb-15d",
    countryId: "eropa",
    operator: "Trylo Europe",
    data: "15 GB",
    duration: "15 hari",
    durationDays: 15,
    price: 199000,
    currency: "IDR",
    features: ["30 negara Eropa", "Roaming bebas biaya", "Hotspot"],
    hotspot: true,
    network: "4G/5G",
    bestValue: true,
  },
  {
    id: "global-10gb-7d",
    countryId: "global",
    operator: "Trylo Global",
    data: "10 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 199000,
    currency: "IDR",
    features: ["190+ negara", "Hotspot sharing", "Auto-switch operator"],
    hotspot: true,
    network: "4G/5G",
    bestseller: true,
  },
  {
    id: "global-20gb-15d",
    countryId: "global",
    operator: "Trylo Global",
    data: "20 GB",
    duration: "15 hari",
    durationDays: 15,
    price: 329000,
    currency: "IDR",
    features: ["190+ negara", "Hotspot sharing", "Priority network"],
    hotspot: true,
    network: "4G/5G",
    bestValue: true,
  },
];

export const plans: Plan[] = [
  {
    id: "jp-5gb-7d",
    countryId: "jp",
    operator: "NTT DoCoMo",
    data: "5 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 89000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
    bestseller: true,
  },
  {
    id: "jp-10gb-15d",
    countryId: "jp",
    operator: "NTT DoCoMo",
    data: "10 GB",
    duration: "15 hari",
    durationDays: 15,
    price: 145000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Priority network"],
    hotspot: true,
    network: "4G/5G",
    bestValue: true,
  },
  {
    id: "kr-5gb-7d",
    countryId: "kr",
    operator: "SK Telecom",
    data: "5 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 79000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
  },
  {
    id: "kr-10gb-15d",
    countryId: "kr",
    operator: "SK Telecom",
    data: "10 GB",
    duration: "15 hari",
    durationDays: 15,
    price: 129000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Unlimited YouTube"],
    hotspot: true,
    network: "4G/5G",
    bestValue: true,
  },
  {
    id: "sg-3gb-5d",
    countryId: "sg",
    operator: "Singtel",
    data: "3 GB",
    duration: "5 hari",
    durationDays: 5,
    price: 59000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
  },
  {
    id: "sg-8gb-10d",
    countryId: "sg",
    operator: "Singtel",
    data: "8 GB",
    duration: "10 hari",
    durationDays: 10,
    price: 109000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Best for business"],
    hotspot: true,
    network: "4G/5G",
    bestseller: true,
  },
  {
    id: "th-5gb-7d",
    countryId: "th",
    operator: "AIS",
    data: "5 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 69000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
    bestseller: true,
  },
  {
    id: "th-10gb-15d",
    countryId: "th",
    operator: "AIS",
    data: "10 GB",
    duration: "15 hari",
    durationDays: 15,
    price: 119000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Unlimited Line"],
    hotspot: true,
    network: "4G/5G",
  },
  {
    id: "us-5gb-10d",
    countryId: "us",
    operator: "T-Mobile",
    data: "5 GB",
    duration: "10 hari",
    durationDays: 10,
    price: 149000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
    bestseller: true,
  },
  {
    id: "us-15gb-30d",
    countryId: "us",
    operator: "T-Mobile",
    data: "15 GB",
    duration: "30 hari",
    durationDays: 30,
    price: 299000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Priority network"],
    hotspot: true,
    network: "4G/5G",
    bestValue: true,
  },
  {
    id: "uk-5gb-7d",
    countryId: "uk",
    operator: "EE",
    data: "5 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 99000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
  },
  {
    id: "uk-10gb-15d",
    countryId: "uk",
    operator: "EE",
    data: "10 GB",
    duration: "15 hari",
    durationDays: 15,
    price: 169000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Best for tourist"],
    hotspot: true,
    network: "4G/5G",
    bestValue: true,
  },
  {
    id: "fr-5gb-7d",
    countryId: "fr",
    operator: "Orange",
    data: "5 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 99000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
  },
  {
    id: "de-5gb-7d",
    countryId: "de",
    operator: "Deutsche Telekom",
    data: "5 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 99000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
  },
  {
    id: "tr-5gb-7d",
    countryId: "tr",
    operator: "Turkcell",
    data: "5 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 79000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
    bestseller: true,
  },
  {
    id: "au-5gb-10d",
    countryId: "au",
    operator: "Telstra",
    data: "5 GB",
    duration: "10 hari",
    durationDays: 10,
    price: 129000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
  },
  {
    id: "ae-5gb-7d",
    countryId: "ae",
    operator: "Etisalat",
    data: "5 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 119000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
    bestseller: true,
  },
  {
    id: "vn-5gb-7d",
    countryId: "vn",
    operator: "Viettel",
    data: "5 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 59000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
  },
  {
    id: "my-5gb-7d",
    countryId: "my",
    operator: "Maxis",
    data: "5 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 59000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
  },
  {
    id: "hk-5gb-7d",
    countryId: "hk",
    operator: "CSL",
    data: "5 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 79000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
  },
  {
    id: "tw-5gb-7d",
    countryId: "tw",
    operator: "Chunghwa",
    data: "5 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 79000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
  },
  {
    id: "it-5gb-7d",
    countryId: "it",
    operator: "TIM",
    data: "5 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 99000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
  },
  {
    id: "es-5gb-7d",
    countryId: "es",
    operator: "Movistar",
    data: "5 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 99000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
  },
  {
    id: "nl-5gb-7d",
    countryId: "nl",
    operator: "KPN",
    data: "5 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 99000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
  },
  {
    id: "au-10gb-15d",
    countryId: "au",
    operator: "Telstra",
    data: "10 GB",
    duration: "15 hari",
    durationDays: 15,
    price: 199000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Priority network"],
    hotspot: true,
    network: "4G/5G",
    bestValue: true,
  },
  {
    id: "ca-5gb-10d",
    countryId: "ca",
    operator: "Rogers",
    data: "5 GB",
    duration: "10 hari",
    durationDays: 10,
    price: 149000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
  },
  {
    id: "nz-5gb-10d",
    countryId: "nz",
    operator: "Spark",
    data: "5 GB",
    duration: "10 hari",
    durationDays: 10,
    price: 139000,
    currency: "IDR",
    features: ["4G/5G LTE", "Hotspot sharing", "Instant activation"],
    hotspot: true,
    network: "4G/5G",
  },
];

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  country: string;
  flag: string;
  rating: number;
  text: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rina Pradnya",
    role: "Travel Blogger",
    country: "Indonesia",
    flag: "id",
    rating: 5,
    text: "Pertama kali coba eSIM untuk trip ke Jepang. Prosesnya super gampang, QR code langsung aktif. Sinyal di Tokyo stabil banget!",
    avatar: "RP",
  },
  {
    id: "t2",
    name: "Bagas Wicaksono",
    role: "Software Engineer",
    country: "Indonesia",
    flag: "id",
    rating: 5,
    text: "Sering business trip ke Singapura. Trylo jadi solusi andalan, gak perlu lagi beli kartu di airport. Tinggal install, langsung connect.",
    avatar: "BW",
  },
  {
    id: "t3",
    name: "Sarah Anggraini",
    role: "Digital Nomad",
    country: "Indonesia",
    flag: "id",
    rating: 5,
    text: "Sudah kepake di 8 negara. Yang paling worth it paket regional Asia, hemat banget. Hotspot juga bisa buat kerja di laptop.",
    avatar: "SA",
  },
  {
    id: "t4",
    name: "Michael Tan",
    role: "Photographer",
    country: "Filipina",
    flag: "ph",
    rating: 5,
    text: "Trylo makes traveling so much easier. No more hunting for local SIMs. The global plan covered me across 15 countries.",
    avatar: "MT",
  },
  {
    id: "t5",
    name: "Emma Schmidt",
    role: "Tourist",
    country: "Jerman",
    flag: "de",
    rating: 5,
    text: "Used Trylo during my trip to Bali. Setup was instant and the connection was reliable everywhere I went. Highly recommend!",
    avatar: "ES",
  },
  {
    id: "t6",
    name: "Putri Anjani",
    role: "Mahasiswa",
    country: "Indonesia",
    flag: "id",
    rating: 5,
    text: "Kemarin studi tour ke Eropa 2 minggu, pakai paket regional Eropa. Keliling 6 negara tetep connect mulus. Mantap!",
    avatar: "PA",
  },
];

export type Feature = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    id: "instant",
    icon: "bolt",
    title: "Aktivasi Instan",
    description: "Beli sekarang, langsung dapat QR code. Scan, aktif. Online dalam 5 menit.",
  },
  {
    id: "global",
    icon: "globe",
    title: "190+ Negara",
    description: "Satu platform untuk semua destinasi. Dari Asia sampai Amerika, semua tercover.",
  },
  {
    id: "no-roaming",
    icon: "shield",
    title: "Bebas Roaming",
    description: "Harga flat, no hidden cost. Gak ada tagihan kejutkan pas pulang.",
  },
  {
    id: "hotspot",
    icon: "wifi",
    title: "Hotspot Sharing",
    description: "Bagi koneksi ke laptop, tablet, atau teman. Semua tetap online.",
  },
  {
    id: "support",
    icon: "chat",
    title: "Support 24/7",
    description: "Tim support Bahasa Indonesia, siap bantu kapan pun lewat chat.",
  },
  {
    id: "refund",
    icon: "refresh",
    title: "Garansi Refund",
    description: "Belum dipakai? Bisa refund 100%. Belum connect? Bisa tukar paket.",
  },
];

export type Step = {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
};

export const steps: Step[] = [
  {
    id: "choose",
    number: 1,
    title: "Pilih Destinasi",
    description: "Cari negara atau pilih paket regional. Bandingkan operator dan harga.",
    icon: "search",
  },
  {
    id: "buy",
    number: 2,
    title: "Beli & Bayar",
    description: "Bayar dengan e-wallet, kartu kredit, atau transfer. Aman, encrypted.",
    icon: "cart",
  },
  {
    id: "install",
    number: 3,
    title: "Scan QR Code",
    description: "Buka kamera HP, scan QR. eSIM otomatis terinstall. Tinggal aktifkan.",
    icon: "qr",
  },
  {
    id: "connect",
    number: 4,
    title: "Online!",
    description: "Langsung connect ke operator lokal. Internet aman sampai pulang.",
    icon: "check",
  },
];

export const formatPrice = (price: number, currency: string = "IDR"): string => {
  if (currency === "IDR") {
    return `Rp${price.toLocaleString("id-ID")}`;
  }
  return `${currency} ${price}`;
};

export const getCountry = (id: string) => countries.find((c) => c.id === id);
export const getPlansByCountry = (countryId: string) =>
  plans.filter((p) => p.countryId === countryId);
export const getPopularCountries = () => countries.filter((c) => c.popular);
export const getBestsellers = () => plans.filter((p) => p.bestseller);
export const getPlan = (id: string) =>
  plans.find((p) => p.id === id) || regionalPlans.find((p) => p.id === id);
export const allPlans = [...plans, ...regionalPlans];
