import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TABLE_HEADS = [
    'ID Author',
    'Description Author',
    'Name Author',
    'Action',
];

function ListViewChap() {
    const [chaps, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get('http://26.232.136.42:8080/api/chapter/getAllChapter')
            .then((chaps) => {
                setCategories(Array.from(chaps.data.result));
                console.log(Array.from(chaps.data.result)); // Log for debugging
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
                            {chaps.map((chap) => (
                                <tr key={chap.idAuthor}>
                                    <td className="px-3 py-3">
                                        {chap.idAuthor}
                                    </td>
                                    <td className="px-3 py-3">
                                        {chap.descriptionAuthor}
                                    </td>
                                    <td className="px-3 py-3">
                                        {chap.nameAuthor}
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

export default ListViewChap;
