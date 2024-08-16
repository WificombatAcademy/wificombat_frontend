import DesktopSidebar from "../components/Dashboard/DesktopSidebar";
import Providers from "../utils/progress-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <DesktopSidebar />
        <body className="">{children}</body>
      </Providers>
    </html>
  );
}
