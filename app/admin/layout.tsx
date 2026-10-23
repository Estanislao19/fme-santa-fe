import type { Metadata } from "next";
import "./admin.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Administración FME", robots: { index: false, follow: false }, alternates: { canonical: null } };
export default function Layout({ children }: { children: React.ReactNode }) { return <div className="admin-root">{children}</div>; }
