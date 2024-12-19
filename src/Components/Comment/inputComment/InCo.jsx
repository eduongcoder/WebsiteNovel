import { useSelector } from 'react-redux';
import { useState } from 'react';
import { CreateComment } from "@/Redux/ReduxSlice/CommentSlice";
import { useDispatch } from 'react-redux';

const InputComment = ({ idChapter }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);  // Lấy thông tin người dùng từ Redux
    const idUser = user ? user.idUser : null; // Nếu người dùng đã đăng nhập, lấy idUser, nếu không thì là null
    const [contentComment, setContentComment] = useState("");  // Quản lý nội dung bình luận
    console.log(" id user comment :"+idUser)
    const handleSubmit = async () => {
        if (!idUser) {
            alert("Bạn cần đăng nhập để bình luận!");
            return; // Nếu không có idUser, không cho phép gửi bình luận
        }

        if (!contentComment.trim()) {
            alert("Nội dung bình luận không được để trống!");
            return;
        }

        // Tạo payload cho API
        const commentData = {
            likeComment: 0,
            dislikeComment: 0,
            content_Comment: contentComment,
            reviewStatusComment: true,
            idChapter: idChapter,
            idUser: idUser,  // Sử dụng idUser đã lấy từ Redux
        };

       try {
         await dispatch(CreateComment(commentData));
       } catch (error) {
        console.error("Error creating comment")
       } // Gửi comment qua Redux action
       

        // Reset nội dung bình luận sau khi gửi
        setContentComment("");
    };

    return (
        <div className="input-comment-container p-4 border rounded shadow-sm">
            <textarea
                value={contentComment}
                onChange={(e) => setContentComment(e.target.value)}
                placeholder="Nhập bình luận của bạn..."
                className="px-0 w-full text-sm text-white-900 border-0  focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            />
            <button
                onClick={handleSubmit}
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 bg-red-300 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
                Gửi bình luận
            </button>
        </div>
    );
};

export default InputComment;
