import Header from './Header';
import Sidebar from './Sidebar';
import Carousel from '../../Components/PagesHomeUser/Carousel';
import TTTe from '../../Components/TestLayoutJSX/EreaText/TTTe';
function DefaultLayout({ children }) {
    return (
        <div className='bg-gradient-to-r from-violet-500 to-fuchsia-500'>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
