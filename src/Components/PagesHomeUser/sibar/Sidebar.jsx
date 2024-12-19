import { userLogin, userlocal } from '@/Redux/ReduxSlice/Seletor';
import React, { useEffect, useState } from 'react';
import { temp } from '@/Redux/ReduxSlice/Seletor';
import { useDispatch, useSelector } from 'react-redux';
import { FetchHistory, DeleteHistory } from '@/Redux/ReduxSlice/userSlice';
import UpdateUser from '../UpdateUser/LayoutUpUs';
import { history } from '@/Redux/ReduxSlice/Seletor';

const SidebarUser = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const historys = useSelector(history);
    console.log(
        'nameNovel:',
        historys && historys.length > 0 ? historys[0].id.idNovel : 'No data available',
    );
    // Lấy thông tin người dùng từ Redux
    // const temp = JSON.parse(localStorage.getItem('user'));
    // console.log('tgyhujnk ', temp);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                await dispatch(
                    FetchHistory(
                        JSON.parse(localStorage.getItem('user'))?.result
                            ?.idUser,
                    ),
                );
            } catch (error) {
                console.error('FetchComment: ' + error.message);
            }
        };
        fetchUsers();
        setUser(temp);
    }, []);

    const handleOpenSidebar = () => {
        // console.log('wwf', JSON.parse(localStorage.getItem('user'))?.result);

        if (JSON.parse(localStorage.getItem('user'))?.result == null) {
            alert('Bạn cần đăng nhập để tài khoản!');
        } else {
            setIsOpen(true);
        }
    };
    const handleHistory = async() => {
        const body = {
            idNovel:historys[0]?.id?.idNovel,
            idUser:historys[0]?.id?.idUser,
            //... other fields if needed
        };
        console.log("ftygu",body);
        try {
            if( historys && historys.length > 0 ){
                await dispatch(DeleteHistory(JSON.stringify(body)));
            }else
            alert('Không xóa có lịch sử đ��c sách!');
         
        } catch (error) {
            console.log(error);
        }
    };
    const handelogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setIsOpen(false);
    };

    return (
        <div>
            {/* Nút Tài Khoản */}
            <button
                onClick={handleOpenSidebar}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
                Tài Khoản
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 w-80  bg-gradient-to-r from-cyan-500 to-blue-500 p-5 shadow-lg h-screen z-50 transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-600 hover:text-black mb-4"
                >
                    ×
                </button>

                {/* User Info */}
                {JSON.parse(localStorage.getItem('user'))?.result &&
                JSON.parse(localStorage.getItem('user'))?.result?.idUser
                    .length > 0 ? (
                    <div className="flex items-center bg-gradient-to-r rounded from-yellow-200 to-orange-600 space-x-3 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img
                                className="w-10 h-10 rounded-full"
                                src={
                                    JSON.parse(localStorage.getItem('user'))
                                        ?.result?.avatarUser
                                }
                                alt="User Avatar"
                            ></img>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white-900 truncate dark:text-white">
                                {
                                    JSON.parse(localStorage.getItem('user'))
                                        ?.result?.userName
                                }
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {
                                    JSON.parse(localStorage.getItem('user'))
                                        ?.result?.email
                                }
                            </p>
                        </div>
                        <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                            <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                            Available
                        </span>
                    </div>
                ) : (
                    console.log()
                )}
                {JSON.parse(localStorage.getItem('user'))?.result &&
                JSON.parse(localStorage.getItem('user'))?.result?.idUser
                    .length > 0 ? (
                    <UpdateUser
                        user={JSON.parse(localStorage.getItem('user'))?.result}
                    />
                ) : (
                    console.log()
                )}
                {JSON.parse(localStorage.getItem('user'))?.result &&
                JSON.parse(localStorage.getItem('user'))?.result?.idUser
                    .length > 0 ? (
                    <div className="p-4">
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">
                                    {' '}
                                    name novel
                                </label>
                                <p className="w-full border rounded px-3 py-2">
                                    {historys && historys.length > 0
                                        ? historys[0]?.nameNovel
                                        : 'No data available'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    name chapter
                                </label>
                                <p className="w-full border rounded px-3 py-2">
                                    {historys && historys.length > 0
                                        ? historys[0]?.titleChapter
                                        : 'No data available'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    time history
                                </label>
                                <p className="w-full border rounded px-3 py-2">
                                    { historys && historys.length > 0 ?(historys[0]?.readingTime && (
                                        <>
                                            {`${historys[0].readingTime[2]}/${
                                                historys[0].readingTime[1]
                                            }/${
                                                historys[0].readingTime[0]
                                            } ${historys[0].readingTime[3]
                                                .toString()
                                                .padStart(
                                                    2,
                                                    '0',
                                                )}:${historys[0].readingTime[4]
                                                .toString()
                                                .padStart(
                                                    2,
                                                    '0',
                                                )}:${historys[0].readingTime[5]
                                                .toString()
                                                .padStart(2, '0')}`}
                                        </>
                                    )):" "}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={handleHistory}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Delete history 
                            </button>
                        </form>
                    </div>
                ) : (
                    console.log()
                )}
                <button
                    onClick={handelogout}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 p-4"
                >
                    log out
                </button>
                {/* Các phần khác vẫn giữ nguyên */}
            </div>
        </div>
    );
};

export default SidebarUser;
