import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNovelsNoImage } from '@/Redux/ReduxSlice/novelSlice';

function ShowCa() {
    const dispatch = useDispatch();

    // Lấy dữ liệu từ Redux Store
    const novels = useSelector((state) => state.novel.novelsNoImage);

    // Gọi API khi component mount
    useEffect(() => {
        const fca =  async() => { await dispatch(fetchNovelsNoImage());}
        fca();
    }, []);

    // Xử lý trường hợp dữ liệu chưa sẵn sàng hoặc không hợp lệ
    if (!novels || novels.length === 0) {
        return <div className="text-center">No data available.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-6 bg-black shadow-md rounded-lg p-6">
            <h2 className="text-2xl text-white font-semibold text-center mb-4">
                List of Novels and Categories
            </h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border text-white border-gray-300 px-4 py-2 text-left">
                            Tên Tiểu Thuyết
                        </th>
                        <th className="border text-white border-gray-300 px-4 py-2 text-left">
                            Thể Loại
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {novels.map((novel) =>
                        novel.categories?.map((category) => (
                            <tr key={`${novel.idNovel}-${category.idCategory}`}>
                                <td className="border text-white border-gray-300 px-4 py-2">
                                    {novel.nameNovel}
                                </td>
                                <td className="border text-white border-gray-300 px-4 py-2">
                                    {category.nameCategory}
                                </td>
                            </tr>
                        )),
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ShowCa;
