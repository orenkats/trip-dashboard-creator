import DashboardForm from "@/components/dashboard/DashboardForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F8F8]">
      <nav className="border-b bg-white/80 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-transparent bg-clip-text">
            TravelGram
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">@travelblogger</span>
          </div>
        </div>
      </nav>
      
      <main className="pt-20 pb-12">
        <DashboardForm />
      </main>
    </div>
  );
};

export default Index;