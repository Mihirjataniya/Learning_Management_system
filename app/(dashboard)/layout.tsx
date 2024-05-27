import Navbar from "./_components/Navbar"
import SideBar from "./_components/SideBar"


function Dashboardlayout({
    children
}:{
    children : React.ReactNode
}) {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
          <Navbar />
      </div>
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
            <SideBar />
        </div>
        <main className=" h-full pt-[80px] md:pl-56">
          {children}
        </main>
     
    </div>
  )
}

export default Dashboardlayout
