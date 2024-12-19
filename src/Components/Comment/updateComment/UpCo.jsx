import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { UpdateComment, FetchComment } from '@/Redux/ReduxSlice/CommentSlice';
import { comment } from '@/Redux/ReduxSlice/Seletor';

const UpdaComm = ({ idChapter, idComment }) => {
    const dispatch = useDispatch();
    const comments = useSelector(comment);
    const user = useSelector((state) => state.user.user); // Get user info from Redux
    const idUser = user ? user.idUser : null; // If user is logged in, get idUser, else null
    const commentToEdit = comments.find(co => co.idComment === idComment);
    const [contentComment, setContentComment] = useState(commentToEdit.content_Comment); // Manage comment content
    useEffect(() => {
        const fetchComments = async () => {
            try {
                await dispatch(FetchComment(idChapter)); // Fetch comments based on chapter ID
                // Find the comment by idComment and set its content
               
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, []); // Add relevant dependencies

    const handleSubmit = async () => {
        if (!idUser) {
            alert('Bạn cần đăng nhập để sửa bình luận!');
            return; // If no idUser, prevent submitting comment
        }

        // Prepare the payload for the API
        const commentData = {
            idComment: idComment,
            likeComment: 0,
            dislikeComment: 0,
            content_Comment: contentComment,
            reviewStatusComment: true,
            idChapter: idChapter,
            idUser: idUser, // Use idUser from Redux
        };

        try {
            await dispatch(UpdateComment(commentData)); // Update the comment via Redux action
            setContentComment(''); // Reset comment content after submitting
        } catch (error) {
            console.error('Error updating comment:', error); // Log any errors
        }
    };

    return (
        <div className="input-comment-container p-4 border rounded shadow-sm">
            <textarea
                value={contentComment}
                onChange={(e) => setContentComment(e.target.value)}
                placeholder="Nhập bình luận của bạn..."
                className="border w-full p-2 rounded"
            />
            <button
                onClick={handleSubmit}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Gửi bình luận
            </button>
        </div>
    );
};

export default UpdaComm;
