import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Logo() {
    return ( <div className="flex items-center bg-white p-4 rounded-full shadow-md">
        <a href="https://your-link-here.com" target="_blank" rel="noopener noreferrer">
          {/* <img 
            src="https://static.wikia.nocookie.net/powerlisting/images/b/be/Admin.jpg/revision/latest?cb=20240525173212"
            alt="Logo" 
            // className="w-15 h-15 mr-4" 
          /> */}
          {/* <button className="p-2 mx-1 bg-gray-200 rounded-full hover:bg-gray-300">
          <FontAwesomeIcon icon={faUserTie } />
        </button> */}
        <a href="#">
        <img className="w-auto h-[30] sm:h-10" src="https://www.svgrepo.com/show/217141/admin.svg" alt="" />
        </a>
        </a>
        </div> );
}

export default Logo;