import Sidebarroutes from "./Sidebar-routes"
import Logo from "./Logo"


function SideBar () {
  return (
    <div className="h-full border-r border-black flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <Sidebarroutes />
      </div>
    </div>
  )
}

export default SideBar     
