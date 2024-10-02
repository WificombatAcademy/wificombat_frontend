import DesktopSidebar from "../components/Dashboard/DesktopSidebar";
import Providers from "../utils/progress-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>    
      <DesktopSidebar />
      <body className="relative">{children}</body>
    </div>
  );
}