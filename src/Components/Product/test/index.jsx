import React, { useEffect, useState } from 'react';
import axios from 'axios';
const TABLE_HEADS = [
    'id_Novel',
    'name_Novel',
    'description_Novel',
    'status_Novel',
    'file',
    'action',
];
function ProductList() {
    const [p, setp] = useState([]);

    // useEffect(() => {
    //     fetch('http://26.232.136.42:8080/api/novel/getNovels')
    //         .then((res) => res.json())
    //         .then((p) => {
    //             console.log(p);
    //             // setp(p);
    //         })
    //         .catch((error) => console.error('Error fetching data:', error));
    // }, []);

    useEffect(() => {
        axios
            .get('http://26.232.136.42:8080/api/novel/getNovels')
            //.then((p) => p.json())
            .then((p) => {
                setp(Array.from(p.data.result));
                console.log(Array.from(p.data.result));
                // Assuming response.data contains the expected structure
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
                            {p.map((novel) => (
                                <tr key={novel.idNovel}>
                                    <td className="px-3 py-3">
                                        {novel.idNovel}
                                    </td>
                                    <td className="px-3 py-3">
                                        {novel.nameNovel}
                                    </td>
                                    <td className="px-3 py-3">
                                        {novel.descriptionNovel}
                                    </td>
                                    <td className="px-3 py-3">
                                        {novel.statusNovel}
                                    </td>
                                    <td className="px-3 py-3">
                                        <img
                                            src={novel.imageNovel}
                                            alt={`Novel ${novel.idNovel}`}
                                            className="w-20 h-auto"
                                        />
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
{
    /* <div>
{p.map((ps) => (
    <div className="px-3 py-3">{ps.id_Novel}</div>
))}
</div> */
}

{
    /* <td className="px-3 py-3">
                                        {ps.nameNovel}
                                    </td> */
}
{
    /* <td className="px-3 py-3">
                                        {ps.description_Novel}
                                    </td>
                                    <td className="px-3 py-3">
                                        {ps.status_Novel}
                                    </td>
                                    <td className="px-3 py-3">
                                        <img
                                            src={ps.file}
                                            alt={`Album ${ps.id_Novel}`}
                                            className="w-20 h-auto"
                                        />
                                    </td> */
}
{
    /* {
                                p.result.map((novel) => (
                                    <tr key={novel.id_Novel}>
                                        <td className="px-3 py-3">{novel.id_Novel}</td>
                                        <td className="px-3 py-3">{novel.nameNovel}</td>
                                        <td className="px-3 py-3">{novel.description_Novel}</td>
                                        <td className="px-3 py-3">{novel.status_Novel}</td>
                                        <td className="px-3 py-3">
                                            <img
                                                src={novel.file}
                                                alt={`Novel ${novel.id_Novel}`}
                                                className="w-20 h-auto"
                                            />
                                        </td>
                                    </tr>
                                ))
                             } */
}
export default ProductList;
