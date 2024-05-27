import NavbarRoutes from "@/components/NavbarRoutes"
import MobileSidebar from "./MobileSidebar"

function Navbar() {
  return (
    <div className=" border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  )
}

export default Navbar
