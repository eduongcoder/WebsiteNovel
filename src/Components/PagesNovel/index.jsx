import React from 'react';
import { useParams } from 'react-router-dom';
import TTTe from '@/Components/TestLayoutJSX/EreaText/TTTe';
import PageNovel from './CardNovel/pageNovel';

function Customer() {
    const { idNovel } = useParams(); // Lấy idNovel từ URL

    return (
        <div className=" bg-gradient-to-r from-cyan-500 to-blue-500  ">
            {/* <TTTe /> */}
            {/* <h1 className="text-2xl font-bold text-center mb-4">
                Details for Novel ID: {idNovel}
            </h1> */}
            <PageNovel idNovel={idNovel} />{' '}
            {/* Truyền idNovel xuống PageNovel */}
        </div>
    );
}

export default Customer;
