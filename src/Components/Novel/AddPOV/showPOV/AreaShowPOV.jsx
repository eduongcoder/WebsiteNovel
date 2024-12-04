import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNovelsNoImage } from '@/Redux/ReduxSlice/novelSlice';

function ShowPOV() {
    const dispatch = useDispatch();

    // Lấy dữ liệu từ Redux Store
    const novels = useSelector((state) => state.novel.novelsNoImage);

    // Gọi API khi component mount
    useEffect(() => {
        dispatch(fetchNovelsNoImage());
    }, [dispatch]);

    // Xử lý trường hợp dữ liệu chưa sẵn sàng hoặc không hợp lệ
    if (!novels || novels.length === 0) {
        return <div className="text-center">No data available.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-6 bg-black shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">
                List of Novels and POV
            </h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            Novel Name
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            POV
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {novels.map((novel) =>
                        novel.pointOfViews?.map((pointOfView) => (
                            <tr key={`${novel.idNovel}-${pointOfView.idPointOfView}`}>
                                <td className="border border-gray-300 px-4 py-2">
                                    {novel.nameNovel}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {pointOfView.namePointOfView}
                                </td>
                            </tr>
                        )),
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ShowPOV;
