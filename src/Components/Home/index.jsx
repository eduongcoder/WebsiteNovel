// src/AdminSettingPages/Home.jsx
import React from 'react';
import TopHome from './AreaTop';
import Cards from './AreaCards/Cards';
import ASPC from './Recharts/AreaSPBChart/ASPC';
import OrderTable from './AreaTable/ODTable';
import Carousel from '@/Layout/DefaultLayout/Carousel';
import TYP from './TYP';
function Home() {
    return (
        <div className='mx-5 space-y-[15px]'>
            
            <TopHome />
            <Cards />
            {/* <TYP/> */}
            <ASPC />
            <OrderTable />
        </div>
    );
}

export default Home;
