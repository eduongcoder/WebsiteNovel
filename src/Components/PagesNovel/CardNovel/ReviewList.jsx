import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { FetchCommentNovel, LikeComment,DisLikeComment } from '@/Redux/ReduxSlice/CommentSlice';
import { commentNovel } from '@/Redux/ReduxSlice/Seletor';
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';

function ReviewCard({ comment }) {
    const dispatch = useDispatch();
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
    return (
        <div className="bg-gray-800 text-white p-4 mb-4 rounded-lg shadow-md">
            {/* Header */}
            <div className="flex items-center mb-2">
                <img
                    src={comment.avatarUser}
                    alt="avatar"
                    className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                    <p className="font-semibold">{comment.userName}</p>
                    <p className="text-sm text-gray-400">10:22pm</p>
                </div>
            </div>

            {/* Review Content */}
            <div className="text-sm text-gray-300 mb-2">
                {comment.content_Comment}
            </div>

            {/* Footer with likes, dislikes and comments */}
            <div className="flex justify-between text-gray-400 text-xs">
                <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                        <BiSolidLike onClick={handleLikeClick} />
                        <span>{comment.likeComment}</span>
                    </span>
                    <span className="flex items-center">
                        <BiSolidDislike onClick={handleDisLikeClick} />
                        <span>{comment.dislikeComment}</span>
                    </span>
                </div>
                <span className="text-blue-500">Show more</span>
            </div>
        </div>
    );
}

function ReviewList({ idNovel }) {
    const dispatch = useDispatch();
    const comments = useSelector(commentNovel);
    //console.log("dftyuijhbhj",comments)
    useEffect(() => {
        const review = async () => {
            try {
                await dispatch(FetchCommentNovel(idNovel));
            } catch (error) {
                console.error(error);
            }
        };
        review();
    }, []);
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Reviews</h2>
                <div className="text-xs text-gray-400">53% | 120 Reviews</div>
            </div>
            {comments.map((comment) => (
                <ReviewCard comment={comment} />
            ))}
        </div>
    );
}

export default ReviewList;
