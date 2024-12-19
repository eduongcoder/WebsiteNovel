import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChapters, deleteChapters } from '@/Redux/ReduxSlice/chapterSlice';

const TABLE_HEADS = ['idChapter', 'titleChapter', 'historyReads', 'Action'];

function ViewChapters({ idNovel }) {
    const dispatch = useDispatch();
    const { chapters, loading, error } = useSelector((state) => state.chapter);

    useEffect(() => {
        if (idNovel) {
            dispatch(fetchChapters(idNovel));
        }
    }, [idNovel, dispatch]); // Will trigger when idNovel changes

    if (loading) return <p>Loading chapters...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleDelete = async (idChapter) => {
        try {
            await dispatch(deleteChapters(idChapter)).unwrap();
            alert('Chapter deleted successfully.');
        } catch (error) {
            console.error('Failed to delete chapter:', error);
            alert('Error deleting chapter');
        }
    };

    return (
        <div>
            <section>
                <h4>Chapter List</h4>
                <table>
                    <thead>
                        <tr>
                            {TABLE_HEADS.map((th, index) => (
                                <th key={index}>{th}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {chapters && chapters.length > 0 ? (
                            chapters.map((chapter) => (
                                <tr key={chapter.idChapter}>
                                    <td>{chapter.idChapter}</td>
                                    <td>{chapter.titleChapter}</td>
                                    <td>{chapter.historyReads}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleDelete(chapter.idChapter)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={TABLE_HEADS.length}>
                                    No chapters found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default ViewChapters;
