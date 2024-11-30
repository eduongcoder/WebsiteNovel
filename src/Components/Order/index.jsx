import React from 'react';
import OrderTTable from './AreaTableProduct/OrderTable';
import OrderTable from '../Home/AreaTable/ODTable';
import Carousel from '@/Components/Order/Carousel';
import Navbar from '@/Layout/DefaultLayout/navbar';
import CardNovel from './CardNovel';
import CardN from './CardNovel/index1';
import FooterUser from './CardNovel/footerUser';
function Order() {
    return (
        <div>
            <Navbar />
            <div className="sm2:px-40 px-24 mx-auto max-w-[1280px] pt-16 pb-40 sm:pt-36 sm:pb-80">
                <Carousel />
                <CardN />
                <CardN />
            </div>
            <FooterUser />
            
        </div>
    );
}

export default Order;
