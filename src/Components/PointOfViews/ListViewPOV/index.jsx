import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Added necessary imports
import { fetchPov, deletePov } from '@/Redux/ReduxSlice/povSlice';

const TABLE_HEADS = ['Id Point Of View', 'Name Point Of View', 'Action'];

function ListViewPOV() {
    const dispatch = useDispatch();
    const { pov: povs, loading, error } = useSelector((state) => state.pov);

    useEffect(() => {
        dispatch(fetchPov());
    }, [dispatch]);

    const handleDelete = (povId) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            dispatch(deletePov(povId));
        }
    };

    return (
        <div>
            <section className="bg-white rounded-md shadow-cyan-500/50 p-4 md:p-6">
                <div className="mb-3">
                    <h4 className="text-[18px] text-sky-400">Novel</h4>
                </div>
                {/* Display loading or error state */}
                {loading && <div className="text-center text-blue-500">Loading...</div>}
                {error && <div className="text-center text-red-500">Error: {error}</div>}
                {!loading && povs.length === 0 && (
                    <div className="text-center text-gray-500">No data available</div>
                )}
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
                                    <td className="px-3 py-3">{pov.idPointOfView}</td>
                                    <td className="px-3 py-3">{pov.namePointOfView}</td>
                                    <td className="px-3 py-3">
                                        <button
                                            onClick={() => handleDelete(pov.idPointOfView)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
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
