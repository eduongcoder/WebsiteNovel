import React from 'react';
import AreaAddAuth from '../AddaAut/AreaAuthor';
import AreaAddCate from '../AddCate/AreaAddCate';
import AreaAddInputNOvel from './AreaInputNovel/AreaIputNovel';
import AreaPOV from '../AddPOV/AreaPOV';
function ANCP() {
    return (
        <div>
            <div className="flex flex-wrap gap-2 mt-4">
                <div className="px-3 py-1 text-sm font-medium bg-gray-700 rounded-full hover:bg-gray-600"><AreaAddInputNOvel/></div>
                <div className="px-3 py-1 text-sm font-medium bg-gray-700 rounded-full hover:bg-gray-600"> <AreaAddAuth/> </div>
                <div className="px-3 py-1 text-sm font-medium bg-gray-700 rounded-full hover:bg-gray-600"> <AreaAddCate/> </div>
                <div className="px-3 py-1 text-sm font-medium bg-gray-700 rounded-full hover:bg-gray-600"> <AreaPOV/></div>
            </div>
        </div>
    );
}

export default ANCP;
