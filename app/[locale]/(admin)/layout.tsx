import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-dashboard-bg grid [grid-template-areas:'sidebar_header''sidebar_content'] grid-rows-[auto_1fr] grid-cols-[4rem_1fr] lg:grid-cols-[var(--dashboard-sidebar-width)_1fr]">
      <Sidebar />
      <Header />
      <main className="[grid-area:content] overflow-x-hidden min-w-0 p-2 md:p-4">
        {children}
      </main>
    </div>
  );
}
