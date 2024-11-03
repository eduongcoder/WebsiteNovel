import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TABLE_HEADS = ['Id Point Of View', 'Name  Point Of View', 'Action'];

function ListViewPOV() {
    const [povs, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get('http://26.232.136.42:8080/api/pov/getAllPOV')
            .then((povs) => {
                setCategories(Array.from(povs.data.result));
                console.log( Array.from(povs.data.result)); // Log for debugging
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <section className="bg-white rounded-md shadow-cyan-500/50 p-4 md:p-6">
                <div className="mb-3">
                    <h4 className="text-[18px] text-sky-400">Novel</h4>
                </div>
                <div className="rounded-lg border border-gray-950 overflow-x-auto scrollbar-thin scrollbar-track-[var(--scroll-track-bg-color)] scrollbar-thumb-gray-200">
                    <table className="min-w-[900px] w-full border-collapse text-zinc-900">
                        <thead className="text-left text-[17px] bg-slate-400">
                            <tr>
                                {TABLE_HEADS.map((th, index) => (
                                    <th key={index} className="px-3 py-3">
                                        {th}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {povs.map((pov) => (
                                <tr key={pov.idPointOfView}>
                                    <td className="px-3 py-3">
                                        {pov.idPointOfView}
                                    </td>
                                    <td className="px-3 py-3">
                                        {pov.namePointOfView}
                                    </td>
                                  
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default ListViewPOV;
