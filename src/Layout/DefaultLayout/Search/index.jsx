import { faCircleXmark, faMagnifyingGlass, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Search() {
    //  class="w-[450px] h-[50px] flex items-center bg-gray-800 text-gray-200 rounded-3xl pl-5  "
    return ( <div className="w-[450px]" >
        {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg> */}
        {/* mt-6 */}
        <div className="relative  ">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </span>

        <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" />
    </div>
         {/* <input type="text" placeholder="Search" className="bg-gray-800 outline-none flex-1 h-full text-gray-200 placeholder-gray-400 border-0 text-2xl " />
            <button>
              < FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <button>
              < FontAwesomeIcon icon={faSpinner} />
            </button>
            <button className="w-[60px] h-full  rounded-3xl  text-2xl hover:bg-blue-700">
              < FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
             */}
    </div> );
}

export default Search;