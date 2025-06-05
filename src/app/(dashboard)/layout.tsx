import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen">
      <div className="size-full flex">
        <div className="hidden lg:block lg:w-[264px] fixed left-0 top-0 overflow-y-auto h-full">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />
            <main className="flex flex-col py-8 px-6 h-full">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
