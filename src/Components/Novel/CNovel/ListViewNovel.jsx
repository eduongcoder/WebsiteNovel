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
    useEffect(() => {
        const fect = async () => {
            await dispatch(fetchNovels());
        };
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
                <div className="container mx-auto p-4">
                    <ul className="grid grid-cols-5 border-b items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 font-bold text-gray-700 py-2 px-4">
                        <li className="col-span-1 place-items-center">
                            Novel Name
                        </li>
                        <li className="col-span-1 place-items-center">
                            Description
                        </li>
                        <li className="col-span-1 place-items-center">
                            totalChapter
                        </li>
                        <li className="col-span-1 place-items-center">Image</li>
                        <li className="col-span-1 place-items-center">
                            Delete Action
                        </li>
                    </ul>
                    {novels.map((novel) => (
                        <div
                            key={novel.idNovel}
                            className="border border-blue-300 rounded"
                        >
                            <lu
                                className="cursor-pointergrid grid grid-cols-5 border-b items-center justify-center border-gray-300 py-2 px-4 list-none bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  hover:bg-blue-200"
                                onClick={() => toggleContent(novel.idNovel)}
                            >
                                <li className=" border-r place-items-center  h-full border-red-400">
                                    {' '}
                                    <p className="font-medium text-justify text-2xl  text-white-400">
                                        {novel.nameNovel}
                                    </p>
                                </li>
                                <li className=" place-items-center border-r h-full border-red-400">
                                    {' '}
                                    <p className=" text-2xl text-justify text-white-400">
                                        {novel.descriptionNovel}
                                    </p>
                                </li>
                                <li className=" place-items-center border-r h-full border-red-400">
                                    {' '}
                                    <p className=" text-2xl text-justify text-white-400">
                                        {novel.totalChapter}
                                    </p>
                                </li>
                                <li className=" border-r text-justify  place-items-center h-full border-red-400">
                                    {' '}
                                    <p className="px-3 py-3">
                                        <img
                                            src={novel.imageNovel}
                                            alt={`Novel ${novel.idNovel}`}
                                            className="w-20 h-auto bg-origin-border"
                                        />
                                    </p>
                                </li>
                                <li className="col-span-1 items-center ">
                                    {' '}
                                    <button
                                        onClick={() =>
                                            dispatch(deleteNovel(novel.idNovel))
                                        }
                                        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transition duration-150"
                                    >
                                        Xóa
                                    </button>
                                </li>
                            </lu>
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
