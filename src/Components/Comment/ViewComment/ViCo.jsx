import { FetchComment  } from '@/Redux/ReduxSlice/CommentSlice';
import { comment } from '@/Redux/ReduxSlice/Seletor';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CommentCard from '../LayoutComment/LayOutCardNovel';
const ViewComponent = ({ idChapter }) => {
    const dispatch = useDispatch();
    const comments = useSelector(comment);
    console.log("Comments", comments)
    useEffect(() => {
        const fetchComments = async () => {
            try {
                await dispatch(FetchComment(idChapter));
            } catch (error) {
                console.error('FetchComment: ' + error.message);
            }
        };
        fetchComments();
    }, []); // Use idChapter (matching the prop) in the dependency array

    return (
        <div>
            {comments
                // Ensure idChapter matches the property name in the comments
                .map((comment) => (
                    <CommentCard comment={comment} idChapter={idChapter} />
                ))}
        </div>
    );
};

export default ViewComponent;

