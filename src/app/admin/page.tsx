import { curatorConfigured, isCurator } from "@/lib/access";
import { CuratorDashboard } from "@/components/admin/CuratorDashboard";
export const dynamic = "force-dynamic";
export const metadata = { title: "Resource review | Invertis Learn", robots: { index: false, follow: false } };
export default async function AdminPage() { return <CuratorDashboard authenticated={await isCurator()} configured={curatorConfigured()} />; }
