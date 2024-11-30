
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPov, updatePov, fetchPov } from '@/Redux/ReduxSlice/povSlice';

const InputPOV = () => {
    const [idPov, setIdPov] = useState(''); // State lưu id của POV
    const [namePointOfView, setNamePOV] = useState('');
    const [loading, setLoading] = useState(false); // State xử lý trạng thái chờ
    const dispatch = useDispatch();

    // Lấy danh sách POV từ Redux
    useEffect(() => {
        dispatch(fetchPov()); // Gọi API lấy dữ liệu
    }, [dispatch]);

    // Giả sử danh sách POV trong state là `state.pov.pov`
    const povs = useSelector((state) => state.pov.pov) || [];

    // Hàm xử lý khi chọn POV từ combobox
    const handlePovChange = (e) => {
        const selectedPovId = e.target.value;
        setIdPov(selectedPovId);

        // Tìm POV tương ứng trong danh sách
        const selectedPov = povs.find(
            (pov) => String(pov.idPointOfView) === String(selectedPovId),
        );

        // Nếu tìm thấy POV, đặt `namePointOfView` từ dữ liệu POV đã chọn
        setNamePOV(selectedPov ? selectedPov.namePointOfView : '');
    };

    // Hàm xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Bật trạng thái chờ

        if (idPov) {
            // Nếu có `idPov`, thực hiện cập nhật
            await dispatch(
                updatePov({ povId: idPov, updatedPov: { namePointOfView } }),
            );
        } else {
            // Nếu không có `idPov`, tạo mới
            await dispatch(createPov({ namePointOfView }));
        }

        setLoading(false); // Tắt trạng thái chờ
        setIdPov(''); // Xóa giá trị id sau khi xử lý
        setNamePOV(''); // Xóa giá trị name sau khi xử lý
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl p-6 mx-auto bg-cyan-900 rounded-md shadow-md dark:bg-gray-800"
        >
            {/* Combobox để chọn POV */}
            <select
                value={idPov}
                onChange={handlePovChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            >
                <option value="">Chọn POV</option>
                {povs.length > 0 ? (
                    povs.map((pov) => (
                        <option
                            key={pov.idPointOfView}
                            value={pov.idPointOfView}
                        >
                            {pov.namePointOfView}
                        </option>
                    ))
                ) : (
                    <option value="" disabled>
                        Không có POV để chọn
                    </option>
                )}
            </select>

            {/* Input để nhập tên POV */}
            <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="text"
                value={namePointOfView}
                onChange={(e) => setNamePOV(e.target.value)}
                placeholder="Name POV"
                required
            />

            {/* Nút bấm */}
            <button
                type="submit"
                className={`px-8 py-2.5 leading-5 text-white ${
                    loading
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-gray-600'
                } rounded-md`}
                disabled={loading}
            >
                {loading ? 'Đang xử lý...' : idPov ? 'Cập nhật POV' : 'Tạo POV'}
            </button>
        </form>
    );
};

export default InputPOV;
