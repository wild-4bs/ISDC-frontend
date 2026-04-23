import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-dashboard-bg relative grid [grid-template-areas:'sidebar_header''sidebar_content'] grid-rows-[auto_1fr] grid-cols-[4rem_1fr] lg:grid-cols-[var(--dashboard-sidebar-width)_1fr]">
      <Sidebar />
      <Header />
      <div className="p-2 bg-dashboard-bg container mx-auto" style={{ gridArea: "content" }}>
        {children}
      </div>
    </div>
  );
}
