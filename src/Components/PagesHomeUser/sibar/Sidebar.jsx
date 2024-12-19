import { userLogin ,userr } from "@/Redux/ReduxSlice/Seletor";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchUser } from "@/Redux/ReduxSlice/userSlice";
const SidebarUser = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(userLogin); // Lấy thông tin người dùng từ Redux
  const users = useSelector(userr); // Lấy id của truyện hiện tại từ Redux
  
  const idNovel = users? users.idNovel : null; // Nếu có id của truyện, lấy idNovel, nếu không thì là null
  const us = users.filter((user) => user.idNovel === idNovel)
 useEffect(() => {
        const fetchUsers = async () => {
            try {
                await dispatch(FetchUser());
            } catch (error) {
                console.error('FetchComment: ' + error.message);
            }
        };
        fetchUsers();
    }, []);
  const handleOpenSidebar = () => {
    if (!user || !user.idUser) {
      alert("Bạn cần đăng nhập để tài khoản!");
    } else {
      setIsOpen(true);
    }
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
        className={`fixed top-0 right-0 w-80 bg-yellow-200 p-5 shadow-lg h-screen z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-600 hover:text-black mb-4"
        >
          ×
        </button>

        {/* User Info */}
        <div className="flex items-center mb-6">
          <div className="text-gray-800 text-lg font-semibold flex-1">
            <span></span>
          </div>
          <span className="text-red-500 font-bold text-sm">0</span>
        </div>

        {/* Menu */}
        <ul className="space-y-4 text-gray-700">
          <li className="flex justify-between items-center">
            Nâng cấp tài khoản <span className="text-red-500 text-xs">NEW</span>
          </li>
          <li>Tủ truyện của tôi</li>
          <li>Lịch sử giao dịch</li>
          <li>Cài đặt cá nhân</li>
          <li>Yêu cầu hỗ trợ</li>
        </ul>

        {/* Balance */}
        <div className="my-6 flex justify-between">
          <div className="flex items-center">
            <span className="text-orange-500">🍊</span>
            <span className="ml-2">0</span>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-600">🔑</span>
            <span className="ml-2">0</span>
          </div>
        </div>

        {/* Nạp Button */}
        <div className="text-center">
          <button className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg">
            Nạp 🍊
          </button>
        </div>

        {/* Kho truyện */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-2">Kho truyện</h3>
          <ul className="space-y-2">
            <li>Truyện mới</li>
            <li>Truyện full</li>
          </ul>
        </div>

        {/* Xếp hạng */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-2">Xếp hạng</h3>
          <ul className="space-y-2">
            <li>Xếp hạng lượt đọc</li>
            <li>Xếp hạng đề cử</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarUser;
