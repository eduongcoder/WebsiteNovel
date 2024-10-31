import { useState, Fragment } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoute } from './Routes';
import { DefaultLayout } from './Layout';
function App() {
    return (
        <Router>
            <Routes>
                {publicRoute.map((route, index) => {
                    const Layout =
                        route.layout === null ? Fragment : DefaultLayout;
                    const Page = route.component;
                    return (
                        <Route
                            path={route.path}
                            key={index}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
