import Toolbar from '../Toolbar';
import Search from '../Search';
import Logo from '../Logo';
import React, { useContext } from 'react';
import { ThemeContext } from '@/ConText/ThemeConText';
//import image from "./assets/images";
function Header() {
    const { theme } = useContext(ThemeContext);
    return (
        <header
            className={`w-full h-[100px] 
      ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} 
      flex justify-between items-center`}
        >
            {/* Nội dung của container */}
            {/* <div></div> */}
            {/* Logo */}
            <Logo />
            {/* Search bar */}
            <Search />
            {/* Toolbar */}
            <Toolbar />
        </header>
    );
}

export default Header;
