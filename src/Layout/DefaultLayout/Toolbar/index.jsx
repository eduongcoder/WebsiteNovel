import {
    faBell,
    faGear,
    faMoon,
    faSun,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect } from 'react';
import { DARK_THEME, LIGHT_THEME } from '@/ConsTants/ThemeConsTants';
import { ThemeContext } from '@/ConText/ThemeConText';
function Toolbar() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    console.log(theme);

    return (
        <div
            className={`flex items-center 
          ${
              theme === 'dark'
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'bg-white text-black shadow-md'
          } 
          p-4 rounded-full`}
        >
            <button
                className={`p-2 mx-1 
            ${
                theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-black'
            } 
            rounded-full`}
            >
                <FontAwesomeIcon icon={faBell} />
            </button>
            <button
                className={`p-2 mx-1 
            ${
                theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-black'
            } 
            rounded-full`}
            >
                <FontAwesomeIcon icon={faGear} />
            </button>
            {/*  mode */}
            <button
                type="button"
                onClick={toggleTheme}
                className={`p-2 mx-1 
            ${
                theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-black'
            } 
            rounded-full`}
            >
                <FontAwesomeIcon
                    icon={theme === LIGHT_THEME ? faSun : faMoon}
                />
            </button>
            {/* mode */}
            <div className="flex items-center ml-4">
                {/* <img 
            src="https://static.wikia.nocookie.net/powerlisting/images/b/be/Admin.jpg/revision/latest?cb=20240525173212" 
            alt="Avatar" 
            className="w-8 h-8 rounded-full"
          /> */}
                <button
                    className={`p-2 mx-1 
            ${
                theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-black'
            } 
            rounded-full`}
                >
                    <FontAwesomeIcon icon={faUser} />
                </button>
                <div className="ml-2">
                    <div className="font-semibold">admin</div>
                    <div className="text-gray-500 text-sm">Sign-in</div>
                </div>
            </div>
        </div>
    );
}

export default Toolbar;
