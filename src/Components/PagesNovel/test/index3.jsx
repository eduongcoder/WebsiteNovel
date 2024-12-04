import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNovels } from '@/Redux/ReduxSlice/novelSlice';
import { fetchChapters } from '@/Redux/ReduxSlice/chapterSlice';
import ViewChapters from './index2';
import ANCP from '@/Components/Novel/CNovel/AreaANCP';
const TABLE_HEADS = [
    'id_Novel',
    'name_Novel',
    'description_Novel',
    'status_Novel',
    'action',
];

function ProListt() {
    const dispatch = useDispatch();
    const { novels, loading, error } = useSelector((state) => state.novel);

    // State để lưu idNovel được mở và dữ liệu chương
    const [openedId, setOpenedId] = useState(null);
    const [chapterData, setChapterData] = useState({}); // Lưu dữ liệu chương theo idNovel

    useEffect(() => {
        dispatch(fetchNovels());
    }, [dispatch]);

    // Xử lý khi nhấp vào tiêu đề để mở/đóng nội dung
    const toggleContent = async (idNovel) => {
        if (openedId === idNovel) {
            // Đóng nội dung nếu đã mở
            setOpenedId(null);
        } else {
            // Mở nội dung và tải dữ liệu nếu chưa có
            setOpenedId(idNovel);
            if (!chapterData[idNovel]) {
                try {
                    const result = await dispatch(
                        fetchChapters(idNovel),
                    ).unwrap();
                    setChapterData((prev) => ({
                        ...prev,
                        [idNovel]: result, // Lưu dữ liệu chương theo idNovel
                    }));
                } catch (error) {
                    console.error('Failed to fetch chapters:', error);
                }
            }
        }
    };

    // Xử lý xóa novel
    const handleDelete = (idNovel, e) => {
        e.stopPropagation();
        // Logic xử lý xóa
        console.log(`Deleting novel with ID: ${idNovel}`);
    };

    if (loading)
        return <div className="text-center text-blue-500">Loading...</div>;
    if (error)
        return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div>
            <section className="bg-sky-400 rounded-md shadow-cyan-500/50 p-4 md:p-6">
                <h4 className="text-[18px] text-purple-700 mb-3">Novel List</h4>
                <div className="rounded-lg border border-gray-950 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
                    <table className="min-w-[900px] w-full border-collapse text-zinc-900">
                        <thead className="bg-slate-400 text-left text-[17px]">
                            <tr>
                                {TABLE_HEADS.map((th, index) => (
                                    <th key={index} className="px-3 py-3">
                                        {th}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {novels.length > 0 ? (
                                novels.map((novel) => (
                                    <React.Fragment key={novel.idNovel}>
                                        {/* Header Row */}
                                        <tr
                                            className="cursor-pointer bg-gray-100 hover:bg-gray-200"
                                            onClick={() =>
                                                toggleContent(novel.idNovel)
                                            }
                                        >
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
                                                <img
                                                    src={novel.imageNovel}
                                                    alt={`Novel ${novel.idNovel}`}
                                                    className="w-20 h-auto"
                                                />
                                            </td>
                                            <td className="px-3 py-3">
                                                <button
                                                    className="text-red-500 hover:underline"
                                                    onClick={(e) =>
                                                        handleDelete(
                                                            novel.idNovel,
                                                            e,
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Content Row */}
                                        {openedId === novel.idNovel && (
                                            <tr>
                                                <td
                                                    colSpan={TABLE_HEADS.length}
                                                    className="bg-white px-3 py-3"
                                                >
                                                    {chapterData[
                                                        novel.idNovel
                                                    ] ? (
                                                        <ViewChapters
                                                            chapters={
                                                                chapterData[
                                                                    novel
                                                                        .idNovel
                                                                ]
                                                            }
                                                        />
                                                    ) : (
                                                        <div>
                                                            Loading chapters...
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={TABLE_HEADS.length}
                                        className="text-center py-3"
                                    >
                                        No novels available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default ProListt;
