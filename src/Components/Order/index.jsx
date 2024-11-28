import React from 'react';
import OrderTTable from './AreaTableProduct/OrderTable';
import OrderTable from '../Home/AreaTable/ODTable';
import Carousel from '@/Components/Order/Carousel';
import Navbar from '@/Layout/DefaultLayout/navbar';
import CardNovel from './CardNovel';
import CardN from './CardNovel/index1';
function Order() {
    return (
        <div>
            <Navbar />
            <div className="sm2:px-40 px-24 mx-auto max-w-[1280px] pt-16 pb-40 sm:pt-36 sm:pb-80">
                <Carousel />
                <CardNovel />
                <CardN />
            </div>
            <div className="relative left-[50%] right-[50%] -mr-[50vw] mt-10 -ml-[50vw] h-[500px] w-screen">
              <div className='relative'>
                <img className='absolute top-0 left-0 right-0 bottom-0 h-[500px] w-full' src="https://www.wuxiaworld.com/images/novel-rotations-bg.png" alt="limited time special" />
              </div>
              <div className='mx-auto max-w-[1280px] px-24 pt-[2rem]'>
              <div className='relative'>
                <h1 className='font-set-b24 md:font-set-b28 text-white dark:text-gray-t1'> ⚠️ Limited Time Special!</h1>
              </div>
              </div>
            </div>
        </div>
    );
}

export default Order;
