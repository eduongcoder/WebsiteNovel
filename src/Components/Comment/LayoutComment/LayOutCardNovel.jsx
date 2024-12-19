import React from 'react';
import { useDispatch } from 'react-redux';
import DropdownComment from './DropdownComment';
import { LikeComment } from '@/Redux/ReduxSlice/CommentSlice';
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { DisLikeComment } from '@/Redux/ReduxSlice/CommentSlice';
import { IoIosShareAlt } from 'react-icons/io';
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
                    <span className="flex items-center">
                        <IoIosShareAlt />
                        <span>{comment.likeComment}</span>
                    </span>
                </div>
                <span className="text-blue-500">Show more</span>
            </div>
        </div>
    );
}
export default CommentCard;

// function ReviewList() {
//     const reviews = [
//         {
//             username: 'godatom',
//             avatar: 'https://via.placeholder.com/150',
//             time: '5 years ago',
//             content: 'Another novel translated by InVader. Personally, I\'ve always been a sucker for sword cultivation novels, and this one is pretty decent as far as those go....',
//             likes: 158,
//             dislikes: 102,
//             comments: 12
//         },
//         {
//             username: 'Mister fuzz',
//             avatar: 'https://via.placeholder.com/150',
//             time: '5 years ago - Edited',
//             content: 'After finishing the raws, I have to say this is a solid C+/B- read. The MC is kind of a psycho (which is actually important to the story in itself) but he eventually mellows out a bit towards the end...',
//             likes: 108,
//             dislikes: 59,
//             comments: 6
//         },
//         {
//             username: 'sblego11',
//             avatar: 'https://via.placeholder.com/150',
//             time: '5 years ago - Edited',
//             content: 'EDIT: If you are unsure about reading this novel, I\'d recommend giving it a go for at least the first hundred or two hundred chapters. Yes I did drop this novel, but it was a very close thing...',
//             likes: 140,
//             dislikes: 77,
//             comments: 7
//         }
//     ];

//     return (
//         <div className="max-w-4xl mx-auto">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-semibold">Reviews</h2>
//                 <div className="text-xs text-gray-400">53% | 120 Reviews</div>
//             </div>
//             {reviews.map((review, index) => (
//                 <ReviewCard key={index} review={review} />
//             ))}
//         </div>
//     );
// }

// export default ReviewList;
