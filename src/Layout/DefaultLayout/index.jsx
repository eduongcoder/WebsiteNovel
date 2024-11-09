import Header from './Header';
import Sidebar from './Sidebar';
import Carousel from '../../Components/Order/Carousel';
function DefaultLayout({ children }) {
    return (
        <div className="flex flex-col h-full items-center">
            <Header />

            <div className="w-full h-full bg-gray-800 flex">
                <Sidebar />
                <div className="flex-1 h-full bg-gray-800">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
