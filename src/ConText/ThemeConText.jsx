import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DARK_THEME, LIGHT_THEME } from '../ConsTants/ThemeConsTants';

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Load theme from local storage if it exists, otherwise default to LIGHT_THEME
        return window.localStorage.getItem('themeMode') || LIGHT_THEME;
    });

    useEffect(() => {
        // Store theme in local storage whenever it changes
        window.localStorage.setItem('themeMode', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME,
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
