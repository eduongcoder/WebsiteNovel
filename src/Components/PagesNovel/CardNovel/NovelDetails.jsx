import React, { useEffect } from 'react';
import ReviewList from './ReviewList';
import { fetchNovels } from '@/Redux/ReduxSlice/novelSlice';
import { useDispatch, useSelector } from 'react-redux';

function NovelDetails({ idNovel }) {
    const dispatch = useDispatch();
    const { novels, status } = useSelector((state) => state.novel);
     const handleLikeClick = async () => {
            try {
                await dispatch(LikeComment(comment.idComment));
            } catch (error) {
                console.error('Failed to like comment:', error);
            }
            // Gọi LikeComment và truyền idComment
        };
        const handleDisLikeClick = async () => {
            try {
                await dispatch(DisLikeComment(comment.idComment));
            } catch (error) {
                console.error('Failed to dislike comment:', error);
            }
            // Gọi LikeComment và truyền idComment
        };

    useEffect(() => {
        const fetchCard = async () => {
            try {
                await dispatch(fetchNovels());
            } catch (error) {
                console.error("Error fetching novels:", error);
            }
        };
        fetchCard();
    }, [dispatch]);

    if (status === 'loading') {
        return (
            <div className="text-center py-10">
                <p className="text-lg font-medium">Loading novel details...</p>
            </div>
        );
    }

    if (!novels || !Array.isArray(novels)) {
        return (
            <div className="text-center py-10">
                <p className="text-lg font-medium">No novels available.</p>
            </div>
        );
    }

    const novel = novels.find(
        (item) => item.idNovel.toString() === (idNovel?.replace(':', '') || ''),
    );

    if (!novel) {
        return (
            <div className="text-center py-10">
                <p className="text-lg font-medium">Novel not found.</p>
            </div>
        );
    }

    return (
        <section className="bg-gray-900 text-white p-6 rounded-md">
            {/* Thông tin tổng quát */}
            <div className="flex justify-between border-b border-gray-700 pb-4">
                <div>
                    <h2 className="text-lg font-semibold">{novel.nameNovel}</h2>
                    <p className="text-sm text-gray-300">{novel.totalChapter} Chapters</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">{novel.totalChapter}</h2>
                    <p className="text-sm text-gray-300">Zongheng</p>
                </div>
            </div>

            {/* Thể loại */}
            <div className="flex flex-wrap gap-2 mt-4">
                {novel.categories.map((categorie) => (
                    <span
                        key={categorie.idCategory}
                        className="px-3 py-1 text-sm font-medium bg-gray-700 rounded-full hover:bg-gray-600"
                    >
                        {categorie.nameCategory}
                    </span>
                ))}
            </div>

            {/* Chi tiết */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Details</h3>
                <p className="text-sm text-gray-300 mb-4">
                    Schedule:{novel.totalChapter} chapters a week
                </p>
                <p className="text-sm text-gray-300">
                    {novel.descriptionNovel}
                </p>
                <p className="text-sm text-gray-300 mt-2">
                    How will he overcome the odds and rise up to protect his
                    loved ones?
                </p>
            </div>

            <div className="mt-6">
                <ReviewList idNovel={idNovel.replace(':', '')} />
            </div>
        </section>
    );
}

export default NovelDetails;
