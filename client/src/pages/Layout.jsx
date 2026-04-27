import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const Layout = () => {
  return (
    <div className="flex h-screen bg-[#fafbfc]">
      <Sidebar />
      <main className="flex-1 md:pl-64 overflow-y-auto">
        {/* Mobile Header Spacer */}
        <div className="md:hidden h-16 w-full" />
        
        <div className="p-6 sm:p-10 lg:p-12 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Layout