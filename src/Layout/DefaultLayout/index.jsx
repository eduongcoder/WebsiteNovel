import Header from "./Header";
import Sidebar from "./Sidebar";

function DefaultLayout({children}) {
    return (
        <div  className="flex flex-col items-center">
            <Header />
            <div className="w-full min-h-[1000px] bg-gray-800 flex">
            <Sidebar />
            <div className="flex-1 min-h-[1000px] bg-gray-800">
                {children}
            </div>    
            </div>
        </div>
    );
}

export default DefaultLayout;