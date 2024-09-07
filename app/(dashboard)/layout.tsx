import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"

const DashboardLayout = ({
    children 
} : {children:React.ReactNode}) => {
    return (
        <div className="h-full relative md:flex">
            <div className="hidden md:flex md:w-3/12 bg-gray-900 ">
            <Sidebar/>
            </div>
            <div className="md:w-9/12">
            <Navbar />
            {children}
            </div>
           
        </div>
    )
}

export default DashboardLayout