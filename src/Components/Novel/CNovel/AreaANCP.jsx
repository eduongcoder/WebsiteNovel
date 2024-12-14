import React from 'react';
import AreaAddAuth from '../AddaAut/AreaAuthor';
import AreaAddCate from '../AddCate/AreaAddCate';
import AreaAddInputNOvel from './AreaInputNovel/AreaIputNovel';
import AreaPOV from '../AddPOV/AreaPOV';
function ANCP() {
    return (
        <div>
            <div className="flex flex-wrap gap-2 mt-4">
                <div className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"><AreaAddInputNOvel/></div>
                <div className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> <AreaAddAuth/> </div>
                <div className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> <AreaAddCate/> </div>
                <div className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"> <AreaPOV/></div>
            </div>
        </div>
    );
}

export default ANCP;
