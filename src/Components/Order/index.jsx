import React from 'react';
import OrderTTable from './AreaTableProduct/OrderTable';
import OrderTable from '../Home/AreaTable/ODTable';
import Carousel from '@/Components/Order/Carousel';
import Navbar from '@/Layout/DefaultLayout/navbar';
import CardNovel from './CardNovel';
function Order() {
  return <div>
    {/* <OrderTable /> */}
    <Navbar />
    <Carousel />
    <CardNovel />

  </div>;
}

export default Order;