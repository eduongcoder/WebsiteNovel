import React from 'react';

import Carousel from '@/Components/PagesHomeUser/Carousel';
import Navbar from '@/Layout/DefaultLayout/navbar';
import CardN from '../PagesNovel/CardNovel/CardN';
import FooterUser from '../PagesNovel/CardNovel/footerUser';
function Order() {
    return (
        <div className='bg-gradient-to-r from-cyan-500 to-blue-500'>
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
