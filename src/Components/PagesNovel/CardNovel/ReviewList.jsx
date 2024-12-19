import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { FetchCommentNovel } from '@/Redux/ReduxSlice/CommentSlice';
import { commentNovel } from '@/Redux/ReduxSlice/Seletor';
function ReviewCard({ comment }) {
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
            <div className="text-sm text-gray-300 mb-2">{comment.content_Comment}</div>

            {/* Footer with likes, dislikes and comments */}
            <div className="flex justify-between text-gray-400 text-xs">
                <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                        <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 9l2.5 2.5L14 14M4 12h16M14 5l2.5 2.5L14 10"
                            />
                        </svg>
                        <span>{comment.likeComment}</span>
                    </span>
                    <span className="flex items-center">
                        <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2.5 2.5L10 19M20 12H4M10 5l2.5 2.5L10 10"
                            />
                        </svg>
                        <span>{comment.dislikeComment}</span>
                    </span>
                    <span className="flex items-center">
                        <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 2v20M6 6l6 6 6-6"
                            />
                        </svg>
                        <span>0</span>
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
            {/* <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Reviews</h2>
                <div className="text-xs text-gray-400">53% | 120 Reviews</div>
            </div>
            {comments.map((comment) => (
                <ReviewCard  comment={comment} />
            ))} */}
        </div>
    );
}

export default ReviewList;
