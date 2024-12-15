import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNovels, deleteNovel } from '@/Redux/ReduxSlice/novelSlice';
import { fetchChapters, deleteChapters } from '@/Redux/ReduxSlice/chapterSlice';
import { chapter, novel } from '@/Redux/ReduxSlice/Seletor';

const TABLE_HEADS_NOVEL = [
    'id_Novel',
    'name_Novel',
    'description_Novel',
    'status_Novel',
    'action',
];

const TABLE_HEADS_CHAPTER = [
    'idChapter',
    'titleChapter',
    'historyReads',
    'Action',
];

const ListViewNovel = () => {
    const dispatch = useDispatch();
    const novels = useSelector(novel);
    const chapters = useSelector(chapter);
    const [openedId, setOpenedId] = useState(null);
    console.log('kiem tra ', chapters);
    useEffect(  () => {

        const fect =  async () => {await dispatch(fetchNovels());};
        // Fetch novels
        fect();
        }, []);

    const toggleContent = async (idNovel) => {
        if (
            chapters.filter((chapter) => chapter.idNovel === idNovel).length !=
            0
        ) {
            setOpenedId(openedId === idNovel ? null : idNovel);
        } else {
            try {
                await dispatch(fetchChapters(idNovel));
                setOpenedId(openedId === idNovel ? null : idNovel);
            } catch (error) {
                console.error('Failed to fetch');
            }
        }
    };
    return (
        <div className="container mx-auto p-4">
            <section>
                <h4 className="text-xl font-bold mb-4">Novel List</h4>
                <div className="space-y-4">
                    {novels.map((novel) => (
                        <div
                            key={novel.idNovel}
                            className="border border-blue-300 rounded"
                        >
                            <div
                                className="cursor-pointer  ite bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gray-200"
                                onClick={() => toggleContent(novel.idNovel)}
                            >
                                <lu className="flex flex-col p-4 md:p-0 mt-4 font-medium border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 from-indigo-500 via-purple-500 to-pink-500">
                                    <li>
                                        {' '}
                                        <p className="font-medium">
                                            {novel.nameNovel}
                                        </p>
                                    </li>
                                    <li>
                                        {' '}
                                        <p className="text-sm text-white-600">
                                            {novel.descriptionNovel}
                                        </p>
                                    </li>
                                    <li>
                                        {' '}
                                        <p className="text-sm text-white-600">
                                            totalChapter {novel.totalChapter}
                                        </p>
                                    </li>
                                    <li>
                                        <p className="px-3 py-3">
                                            <img
                                                src={novel.imageNovel}
                                                alt={`Novel ${novel.idNovel}`}
                                                className="w-20 h-auto"
                                            />
                                        </p>
                                    </li>
                                    <li>
                                        {' '}
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    deleteNovel(novel.idNovel),
                                                )
                                            }
                                            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transition duration-150"
                                        >
                                            Xóa
                                        </button>
                                    </li>
                                </lu>
                            </div>
                            <div>
                                {openedId === novel.idNovel && (
                                    <div className="p-4">
                                        <h5 className="font-semibold mb-2">
                                            Chapter List
                                        </h5>
                                        {chapters.length > 0 ? (
                                            <table className="table-auto w-full border-collapse border border-gray-300">
                                                <thead>
                                                    <tr>
                                                        {TABLE_HEADS_CHAPTER.map(
                                                            (th, index) => (
                                                                <th
                                                                    key={index}
                                                                    className="border text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm  me-2 mb-2 px-4 py-2 text-left bg-gray-100"
                                                                >
                                                                    {th}
                                                                </th>
                                                            ),
                                                        )}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {chapters
                                                        .filter(
                                                            (chapter) =>
                                                                chapter.idNovel ===
                                                                novel.idNovel,
                                                        )
                                                        .map((chapter) => (
                                                            <tr
                                                                key={
                                                                    chapter.idChapter
                                                                }
                                                            >
                                                                <td className="border px-4 py-2">
                                                                    {
                                                                        chapter.idChapter
                                                                    }
                                                                </td>
                                                                <td className="border px-4 py-2">
                                                                    {
                                                                        chapter.titleChapter
                                                                    }
                                                                </td>
                                                                <td className="border px-4 py-2">
                                                                    {
                                                                        chapter.historyReads
                                                                    }
                                                                </td>
                                                                <td className="border px-4 py-2">
                                                                    <button
                                                                        onClick={() =>
                                                                            dispatch(
                                                                                deleteChapters(
                                                                                    chapter.idChapter,
                                                                                ),
                                                                            )
                                                                        }
                                                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p>
                                                No chapters found for this novel
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ListViewNovel;
