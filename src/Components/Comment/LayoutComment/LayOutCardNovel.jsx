import React from 'react';
import { useDispatch } from 'react-redux';
import DropdownComment from './DropdownComment';
import { LikeComment } from '@/Redux/ReduxSlice/CommentSlice';
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { DisLikeComment } from '@/Redux/ReduxSlice/CommentSlice';
function CommentCard({ comment, idChapter }) {
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
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <img
                        src={comment.avatarUser}
                        alt="avatar"
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                        <p className="font-semibold">{comment.userName}</p>
                        <p className="text-sm text-gray-400"> Feb. 8, 2022</p>
                    </div>
                </div>
                <DropdownComment
                    idComment={comment.idComment}
                    idChapter={idChapter}
                    userName={comment.userName}
                />
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
export default CommentCard;

