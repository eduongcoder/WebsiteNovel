import React, { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi"; // Import icon
import { useDispatch } from "react-redux";
import UpdateLayoutCom from "./LayUpdCon"; // Giả định bạn có component này
import { DeleteComment } from "@/Redux/ReduxSlice/CommentSlice";
import DeleteLayoutCom from "./layoutDeleteCo";
const DropdownComment = ({ idChapter, idComment ,userName}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleDelete = async () => {
        await dispatch(DeleteComment(idComment));
    };

    return (
        <div className="relative inline-block text-left">
            {/* Button */}
            <button
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
                onClick={toggleDropdown}
            >
                <FiMoreHorizontal />
                <span className="sr-only">Comment settings</span>
            </button>

            {/* Dropdown menu */}
            {isOpen && userName == JSON.parse(localStorage.getItem('user'))?.result?.userName ?  (
                <div
                    id="dropdownComment1"
                    className="absolute right-0 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                    <ul
                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownMenuIconHorizontalButton"
                    >
                        <li>
                            <UpdateLayoutCom
                                idChapter={idChapter}
                                idComment={idComment}
                            />
                        </li>
                        <li>
                            <DeleteLayoutCom
                                idComment={idComment}
                            />
                        </li>
                    </ul>
                </div>
            ) : null}
        </div>
    );
};

export default DropdownComment;
