import Header from "@/components/layout/Header";
import ContainerMain from "@/components/layout/ContainerMain";
import Sidebar from "@/components/layout/Sidebar";
function MainLayout({ children }) {
  return (
    <div className="flex mx-auto w-full max-w-screen-2xl">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <ContainerMain>{children}</ContainerMain>
      </div>
    </div>
  );
}

export default MainLayout;
