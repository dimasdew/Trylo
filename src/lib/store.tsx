"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  joinedAt: string;
};

export type Order = {
  id: string;
  planId: string;
  planName: string;
  country: string;
  flag: string;
  operator: string;
  data: string;
  duration: string;
  durationDays: number;
  price: number;
  status: "active" | "expired" | "upcoming";
  purchasedAt: string;
  activatedAt?: string;
  expiresAt: string;
  dataUsed: string;
  dataTotal: string;
  network: string;
  hotspot: boolean;
  activationCode: string;
};

type StoreState = {
  user: User | null;
  users: User[];
  orders: Order[];
  login: (email: string, password: string) => { ok: boolean; error?: string };
  signup: (
    name: string,
    email: string,
    password: string
  ) => { ok: boolean; error?: string };
  logout: () => void;
  updateProfile: (data: Partial<Pick<User, "name" | "phone">>) => void;
  createOrder: (plan: {
    id: string;
    planName: string;
    country: string;
    flag: string;
    operator: string;
    data: string;
    duration: string;
    durationDays: number;
    price: number;
    network: string;
    hotspot: boolean;
  }) => Order;
  activateOrder: (orderId: string) => void;
  deleteOrder: (orderId: string) => void;
  resetData: () => void;
};

const StoreContext = createContext<StoreState | null>(null);

type StoredUser = User & { password: string };

const STORAGE_KEY = "trylo_store_v1";

const genId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const today = () => new Date().toISOString().slice(0, 10);
const addDays = (days: number) =>
  new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);

const genActivationCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 32; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
    if (i === 7 || i === 15 || i === 23) code += "-";
  }
  return code;
};

const seedOrders: Order[] = [
  {
    id: "ord-seed-001",
    planId: "jp-10gb-15d",
    planName: "Jepang 10GB / 15 Hari",
    country: "Jepang",
    flag: "jp",
    operator: "NTT DoCoMo",
    data: "10 GB",
    duration: "15 hari",
    durationDays: 15,
    price: 145000,
    status: "active",
    purchasedAt: "2026-07-28",
    activatedAt: "2026-07-29",
    expiresAt: addDays(12),
    dataUsed: "3.2 GB",
    dataTotal: "10 GB",
    network: "4G/5G",
    hotspot: true,
    activationCode: genActivationCode(),
  },
  {
    id: "ord-seed-002",
    planId: "asia-5gb-7d",
    planName: "Asia Regional 5GB / 7 Hari",
    country: "Asia (12 negara)",
    flag: "globe",
    operator: "Trylo Asia",
    data: "5 GB",
    duration: "7 hari",
    durationDays: 7,
    price: 89000,
    status: "upcoming",
    purchasedAt: today(),
    expiresAt: addDays(7),
    dataUsed: "0 GB",
    dataTotal: "5 GB",
    network: "4G/5G",
    hotspot: true,
    activationCode: genActivationCode(),
  },
];

const seedUsers: StoredUser[] = [
  {
    id: "usr-seed-001",
    name: "Dimas Soebrata",
    email: "dimas@trylo.id",
    password: "trylo123",
    phone: "+62 812-3456-7890",
    avatar: "DS",
    joinedAt: "2025-03-15",
  },
];

type Persisted = {
  users: StoredUser[];
  orders: Order[];
  currentUserId: string | null;
};

const loadPersisted = (): Persisted => {
  if (typeof window === "undefined")
    return {
      users: seedUsers,
      orders: seedOrders,
      currentUserId: null,
    };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw)
      return {
        users: seedUsers,
        orders: seedOrders,
        currentUserId: null,
      };
    return JSON.parse(raw);
  } catch {
    return {
      users: seedUsers,
      orders: seedOrders,
      currentUserId: null,
    };
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [users, setUsers] = useState<StoredUser[]>(seedUsers);
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const data = loadPersisted();
    setUsers(data.users.length > 0 ? data.users : seedUsers);
    setOrders(data.orders);
    setCurrentUserId(data.currentUserId);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const data: Persisted = { users, orders, currentUserId };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [users, orders, currentUserId, mounted]);

  const user = currentUserId
    ? (() => {
        const u = users.find((u) => u.id === currentUserId);
        if (!u) return null;
        const { password: _pw, ...rest } = u;
        return rest;
      })()
    : null;

  const login: StoreState["login"] = (email, password) => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (!found) return { ok: false, error: "Email belum terdaftar" };
    if (found.password !== password)
      return { ok: false, error: "Password salah" };
    setCurrentUserId(found.id);
    return { ok: true };
  };

  const signup: StoreState["signup"] = (name, email, password) => {
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) return { ok: false, error: "Email sudah terdaftar" };
    const newUser: StoredUser = {
      id: genId("usr"),
      name,
      email,
      password,
      phone: "",
      avatar: name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase(),
      joinedAt: today(),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUserId(newUser.id);
    return { ok: true };
  };

  const logout = () => setCurrentUserId(null);

  const updateProfile: StoreState["updateProfile"] = (data) => {
    if (!currentUserId) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === currentUserId ? { ...u, ...data } : u
      )
    );
  };

  const createOrder: StoreState["createOrder"] = (plan) => {
    const order: Order = {
      id: genId("ord"),
      planId: plan.id,
      planName: plan.planName,
      country: plan.country,
      flag: plan.flag,
      operator: plan.operator,
      data: plan.data,
      duration: plan.duration,
      durationDays: plan.durationDays,
      price: plan.price,
      status: "upcoming",
      purchasedAt: today(),
      expiresAt: addDays(plan.durationDays),
      dataUsed: "0 GB",
      dataTotal: plan.data,
      network: plan.network,
      hotspot: plan.hotspot,
      activationCode: genActivationCode(),
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const activateOrder: StoreState["activateOrder"] = (orderId) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: "active",
              activatedAt: today(),
              dataUsed: "0 GB",
            }
          : o
      )
    );
  };

  const deleteOrder: StoreState["deleteOrder"] = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const resetData = () => {
    setUsers(seedUsers);
    setOrders(seedOrders);
    setCurrentUserId(null);
  };

  if (!mounted) {
    return null;
  }

  return (
    <StoreContext.Provider
      value={{
        user,
        users: users.map(({ password: _pw, ...rest }) => rest),
        orders,
        login,
        signup,
        logout,
        updateProfile,
        createOrder,
        activateOrder,
        deleteOrder,
        resetData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
