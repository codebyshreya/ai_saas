import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"

const DashboardLayout = ({
    children 
} : {children:React.ReactNode}) => {
    return (
        <div className="h-full relative md:flex">
            <div className="hidden md:flex md:w-1/6 bg-gray-900 ">
            <Sidebar/>
            </div>
            <div className="md:w-5/6">
            <Navbar />
            {children}
            </div>
           
        </div>
    )
}

export default DashboardLayout