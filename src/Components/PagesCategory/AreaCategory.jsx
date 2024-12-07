import React, { useState, useEffect } from 'react';
import Navbar from '@/Layout/DefaultLayout/navbar';
import PagesCategory from './fiterCategory';
import FooterUser from '../PagesNovel/CardNovel/footerUser';
function AreaCategory() {
    return ( <div>
        <Navbar />
        <PagesCategory />
        <FooterUser />
    </div> );
}

export default AreaCategory;